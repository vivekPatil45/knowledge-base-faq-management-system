import React, { useState, useMemo, useEffect } from 'react';
import { SearchFilter } from '../articles/SearchFilter';
import { ArticleCard } from '../articles/ArticleCard';
import { ArticleModal } from '../articles/ArticleModal';
import { Announcements } from '../announcements/Announcements';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import type { Article, SearchFilters } from '../../types';
import { getArticles } from '../../api/articles';
import { addFeedback } from '../../api/feedback';
import toast from 'react-hot-toast';

export const EmployeeDashboard: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    keyword: '',
    category: 'All Categories'
  });
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch articles
  useEffect(() => {
    
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await getArticles(searchFilters.keyword, searchFilters.category);
        setArticleData(articles);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch articles.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, [searchFilters.keyword, searchFilters.category]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articleData.filter(article => {
      const matchesKeyword = !searchFilters.keyword || 
        article.title.toLowerCase().includes(searchFilters.keyword.toLowerCase()) ||
        article.content.toLowerCase().includes(searchFilters.keyword.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchFilters.keyword.toLowerCase()));

      const matchesCategory = searchFilters.category === 'All Categories' || 
        article.category === searchFilters.category;

      return matchesKeyword && matchesCategory;
    });
  }, [articleData, searchFilters]);

  // Feedback handler with toast

  const handleFeedback = async (articleId: string, isHelpful: boolean) => {
  const toastId = toast.loading('Submitting feedback...');
  try {
    await addFeedback(articleId, isHelpful ? 'helpful' : 'not helpful');

    // Update local state optimistically
    setArticleData(prevArticles =>
      prevArticles.map(article =>
        article.id === articleId
          ? {
              ...article,
              helpfulCount: article.helpfulCount + (isHelpful ? 1 : 0),
              notHelpfulCount: article.notHelpfulCount + (isHelpful ? 0 : 1)
            }
          : article
      )
    );

    toast.success('Feedback submitted!', { id: toastId });
  } catch (err: any) {
    console.error(err);

     // Check backend status code
    if (err?.response?.status === 400) {
      toast.error('You have already submitted feedback for this article.', { id: toastId });
    } else {
      toast.error('Failed to submit feedback.', { id: toastId });
    }
  }
};


  const handleReadMore = (article: Article) => setSelectedArticle(article);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative">
      
    
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-600/10 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-600/10 animate-pulse blur-3xl delay-1000"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Announcements */}
        <Announcements />

        {/* Search & Filter */}
        <SearchFilter 
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          totalResults={filteredArticles.length}
        />

        {/* Articles List */}
        {isLoading ? (
          <LoadingSkeleton count={6} type="card" />
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onReadMore={handleReadMore}
                onFeedback={handleFeedback}
                searchKeyword={searchFilters.keyword}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.537-1.846l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {searchFilters.keyword || searchFilters.category !== 'All Categories'
                ? "Try adjusting your search terms or filters to find what you're looking for."
                : "No articles are available at the moment. Check back later for updates."}
            </p>
          </div>
        )}
      </div>

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onFeedback={handleFeedback}
      />
    </div>
  );
};
