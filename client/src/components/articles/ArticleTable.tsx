import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import type { Article } from '../../types';
import toast from 'react-hot-toast';

interface ArticleTableProps {
    articles: Article[];
    onViewArticle: (article: Article) => void;
    onEditArticle: (article: Article) => void;
    onDeleteArticle: (id: string) => void;
}

export const ArticleTable: React.FC<ArticleTableProps> = ({
    articles,
    onViewArticle,
    onEditArticle,
    onDeleteArticle
}) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const handleDeleteConfirm = (id: string) => {
        onDeleteArticle(id);
        setShowDeleteConfirm(null);
        toast.success('Article deleted successfully!');
    };

    return (
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/30 overflow-x-auto">
            <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50/80 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Category
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Feedback
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Updated
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {articles.map((article) => {
                        const helpfulRatio = article.helpfulCount + article.notHelpfulCount > 0
                            ? Math.round((article.helpfulCount / (article.helpfulCount + article.notHelpfulCount)) * 100)
                            : 0;

                        return (
                            <tr key={article.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium truncate max-w-xs">
                                    {article.title}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                        {article.category}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-green-600 dark:text-green-400">👍 {article.helpfulCount}</span>
                                        <span className="text-red-600 dark:text-red-400">👎 {article.notHelpfulCount}</span>
                                        <span className="text-gray-500 dark:text-gray-400">({helpfulRatio}%)</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(article.updatedAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center gap-2 justify-end">
                                        <button
                                            onClick={() => onViewArticle(article)}
                                            className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                            title="View Article"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEditArticle(article)}
                                            className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                            title="Edit Article"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(article.id)}
                                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                            title="Delete Article"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delete Article</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Are you sure you want to delete this article? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleDeleteConfirm(showDeleteConfirm)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
