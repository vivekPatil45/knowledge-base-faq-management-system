import React from 'react';
import { Calendar, Tag, ThumbsUp, ThumbsDown, Eye, User } from 'lucide-react';
import type { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onReadMore: (article: Article) => void;
  onFeedback: (articleId: string, isHelpful: boolean) => void;
  searchKeyword?: string;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onReadMore,
  onFeedback,
  searchKeyword,
  className = ''
}) => {
  // Highlight search terms
  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, idx) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={idx} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded font-medium">
          {part}
        </span>
      ) : part
    );
  };

  // Get excerpt
  const getExcerpt = (content: string) => {
    const plainText = content.replace(/#+\s/g, '').replace(/\*\*/g, '');
    const firstParagraph = plainText.split('\n\n')[0];
    return firstParagraph.length > 150 ? firstParagraph.substring(0, 150) + '...' : firstParagraph;
  };

  const helpfulRatio =
    article.helpfulCount + article.notHelpfulCount > 0
      ? Math.round((article.helpfulCount / (article.helpfulCount + article.notHelpfulCount)) * 100)
      : 0;

  return (
    <div
      className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 
                  dark:border-gray-700/30 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 
                  transform hover:scale-[1.02] group ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-0">
        <div className="flex-1">
          <h3
            className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 
                       dark:group-hover:text-blue-400 transition-colors cursor-pointer"
            onClick={() => onReadMore(article)}
          >
            {searchKeyword ? highlightText(article.title, searchKeyword) : article.title}
          </h3>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Author
            </div>
          </div>
        </div>
        <span
          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 
                     dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
        >
          {article.category}
        </span>
      </div>

      {/* Content Preview */}
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          {searchKeyword ? highlightText(getExcerpt(article.content), searchKeyword) : getExcerpt(article.content)}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-300 rounded-md text-xs sm:text-sm font-medium
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Tag className="w-3 h-3" />
            {searchKeyword ? highlightText(tag, searchKeyword) : tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 dark:border-gray-700 gap-3 sm:gap-0">
        {/* Feedback Stats */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-green-500" />
            <span>{article.helpfulCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown className="w-4 h-4 text-red-500" />
            <span>{article.notHelpfulCount}</span>
          </div>
          <div className="text-xs sm:text-sm">{helpfulRatio}% helpful</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end">
          <button
            onClick={() => onFeedback(article.id, true)}
            className="flex items-center gap-1 px-3 py-1 text-green-600 hover:text-green-700 
                 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200
                 transform hover:scale-105 text-xs sm:text-sm"
          >
            <ThumbsUp className="w-4 h-4" />
            Helpful
          </button>

          <button
            onClick={() => onFeedback(article.id, false)}
            className="flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-700 
                 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200
                 transform hover:scale-105 text-xs sm:text-sm"
          >
            <ThumbsDown className="w-4 h-4" />
            Not Helpful
          </button>

          <button
            onClick={() => onReadMore(article)}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 
                 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200
                 transform hover:scale-105 text-xs sm:text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Read More
          </button>
        </div>
      </div>

    </div>
  );
};
