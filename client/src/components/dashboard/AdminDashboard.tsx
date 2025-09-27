import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { Article } from '../../types';
import { ArticleModal } from '../articles/ArticleModal';
import { createArticle, deleteArticle, getArticles, updateArticle } from '../../api/articles';
import { addFeedback as addFeedbackAPI } from '../../api/feedback';
import { DashboardContent } from '../admin/DashboardContent';
import { Sidebar } from '../admin/Sidebar';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'overview' | 'articles' | 'analytics' | 'announcements'>('overview');
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Article API handlers
  const handleAddArticle = async (articleData: any) => {
    try {
      const newArticle = await createArticle(articleData);
      setArticles(prev => [newArticle, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditArticle = async (id: string, articleData: any) => {
    try {
      const updatedArticle = await updateArticle(id, articleData);
      setArticles(prev => prev.map(a => (a.id === id ? updatedArticle : a)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeedback = async (articleId: string, isHelpful: boolean) => {
    try {
      const feedbackType = isHelpful ? 'helpful' : 'not helpful';
      await addFeedbackAPI(articleId, feedbackType);
      setArticles(prev =>
        prev.map(article =>
          article.id === articleId
            ? {
                ...article,
                helpfulCount: article.helpfulCount + (isHelpful ? 1 : 0),
                notHelpfulCount: article.notHelpfulCount + (isHelpful ? 0 : 1),
              }
            : article
        )
      );
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error submitting feedback');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-600/10 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-600/10 animate-pulse blur-3xl delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-screen">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block flex-shrink-0">
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            userName={user?.name}
            articlesCount={articles.length}
          />
        </div>

        {/* Mobile Sidebar Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex">
            <div className="w-64 bg-white dark:bg-gray-800/90 shadow-xl p-6 overflow-y-auto">
              <Sidebar
                currentView={currentView}
                setCurrentView={setCurrentView}
                userName={user?.name}
                articlesCount={articles.length}
              />
              <button
                onClick={() => setSidebarOpen(false)}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Mobile toggle button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Open Menu
          </button>

          <DashboardContent
            currentView={currentView}
            articles={articles}
            onAddArticle={handleAddArticle}
            onEditArticle={handleEditArticle}
            onDeleteArticle={handleDeleteArticle}
            onViewArticle={setSelectedArticle}
          />
        </div>
      </div>

      {/* Article Modal (Overlay with z-50, above Navbar) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto pt-24">
          <ArticleModal
            article={selectedArticle}
            isOpen={!!selectedArticle}
            onClose={() => setSelectedArticle(null)}
            onFeedback={handleFeedback}
          />
        </div>
      )}
    </div>
  );
};
