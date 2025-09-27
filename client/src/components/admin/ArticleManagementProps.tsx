import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { Article } from '../../types';
import toast from 'react-hot-toast';
import { ArticleForm } from '../articles/ArticleForm';
import { ArticleTable } from '../articles/ArticleTable';

interface ArticleManagementProps {
  articles: Article[];
  onAddArticle: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'helpfulCount' | 'notHelpfulCount'>) => void;
  onEditArticle: (id: string, article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'helpfulCount' | 'notHelpfulCount'>) => void;
  onDeleteArticle: (id: string) => void;
  onViewArticle: (article: Article) => void;
}

export const ArticleManagement: React.FC<ArticleManagementProps> = ({
  articles,
  onAddArticle,
  onEditArticle,
  onDeleteArticle,
  onViewArticle
}) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  if (user?.role !== 'admin') return null;

  // Filter articles by search & category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(articles.map(a => a.category)));

  const handleSaveArticle = (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'helpfulCount' | 'notHelpfulCount'>) => {
    if (editingArticle) {
      onEditArticle(editingArticle.id, articleData);
      toast.success('Article updated successfully!');
    } else {
      onAddArticle(articleData);
      toast.success('Article added successfully!');
    }
    setEditingArticle(null);
    setShowForm(false);
  };

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Article Management</h2>
        <button
          onClick={() => {
            setEditingArticle(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                     text-white px-6 py-3 rounded-lg font-medium transition-all duration-200
                     transform hover:scale-105 flex items-center gap-2 shadow-lg self-start md:self-auto"
        >
          <Plus className="w-5 h-5" />
          Add New Article
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/30 p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-200" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border dark:text-gray-300 border-gray-300 dark:border-gray-600 
                         bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-64 relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-800 dark:text-gray-200" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border dark:text-gray-300 border-gray-300 dark:border-gray-600 
                         bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 appearance-none"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredArticles.length} of {articles.length} articles
        </div>
      </div>

      {/* Article Table */}
      <ArticleTable
        articles={filteredArticles}
        onViewArticle={onViewArticle}
        onEditArticle={handleEditClick}
        onDeleteArticle={onDeleteArticle}
      />

      {/* Article Form Modal */}
      <ArticleForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        article={editingArticle}
      />

      {/* Mobile Floating Add Button */}
      <button
        onClick={() => {
          setEditingArticle(null);
          setShowForm(true);
        }}
        className="fixed bottom-6 right-6 md:hidden bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50"
        title="Add Article"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
