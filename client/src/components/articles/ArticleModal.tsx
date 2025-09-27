import React, { useState } from 'react';
import { X, Calendar, Tag, ThumbsUp, ThumbsDown, User, Copy, Share2 } from 'lucide-react';
import type { Article } from '../../types';
import { formatContent } from '../../utils/utils';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onFeedback: (articleId: string, isHelpful: boolean) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onFeedback
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen || !article) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/article/${article.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const helpfulRatio = article.helpfulCount + article.notHelpfulCount > 0
    ? Math.round((article.helpfulCount / (article.helpfulCount + article.notHelpfulCount)) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center gap-3">
           
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(article.createdAt).toLocaleDateString()}</div>
                <div className="flex items-center gap-1"><User className="w-4 h-4" />Author</div>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">{article.category}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className={`p-2 rounded-lg transition-all duration-200 ${copySuccess ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
              title="Copy link"
            >
              {copySuccess ? <Share2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none">{formatContent(article.content)}</div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {article.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                <Tag className="w-4 h-4" />{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with Feedback */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            
            {/* Feedback Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2"><ThumbsUp className="w-4 h-4 text-green-500" />{article.helpfulCount} helpful</div>
              <div className="flex items-center gap-2"><ThumbsDown className="w-4 h-4 text-red-500" />{article.notHelpfulCount} not helpful</div>
              <div className="text-xs">{helpfulRatio}% found this helpful</div>
            </div>

            {/* Feedback Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Was this helpful?</span>
              <button
                onClick={() => { onFeedback(article.id, true); setFeedbackGiven(true); setTimeout(() => setFeedbackGiven(null), 2000); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 transform ${feedbackGiven === true ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 scale-110' : 'text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/30 hover:scale-105'}`}
              >
                <ThumbsUp className="w-5 h-5" /><span className="font-medium">Yes</span>
              </button>
              <button
                onClick={() => { onFeedback(article.id, false); setFeedbackGiven(false); setTimeout(() => setFeedbackGiven(null), 2000); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 transform ${feedbackGiven === false ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 scale-110' : 'text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 hover:scale-105'}`}
              >
                <ThumbsDown className="w-5 h-5" /><span className="font-medium">No</span>
              </button>
            </div>
          </div>

          {/* Feedback Confirmation */}
          {feedbackGiven !== null && (
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
                Thank you for your feedback! This helps us improve our knowledge base.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
