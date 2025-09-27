import React from 'react';
import type { Article } from '../../types';
import { Plus } from 'lucide-react';

interface RecentArticlesProps {
  articles: Article[];
  onManageClick: () => void;
  onViewArticle: (article: Article) => void;
}

export const RecentArticles: React.FC<RecentArticlesProps> = ({ articles, onManageClick, onViewArticle }) => (
  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/30 p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Articles</h3>
      <button
        onClick={onManageClick}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                   text-white px-4 py-2 rounded-lg font-medium transition-all duration-200
                   transform hover:scale-105 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Manage Articles
      </button>
    </div>
    <div className="space-y-3">
      {articles.slice(0, 5).map((article) => (
        <div
          key={article.id}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg 
                     bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          onClick={() => onViewArticle(article)}
        >
          <div className="flex-1 mb-2 sm:mb-0">
            <h4 className="font-medium text-gray-900 dark:text-white">{article.title}</h4>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>{article.category}</span>
              <span>•</span>
              <span>
                {new Date(article.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            👍 {article.helpfulCount} / 👎 {article.notHelpfulCount}
          </div>
        </div>
      ))}
    </div>
  </div>
);
