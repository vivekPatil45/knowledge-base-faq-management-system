import React from 'react';
import { ThumbsDown } from 'lucide-react';
import type { AnalyticsData } from '../../types';

export const LeastHelpful: React.FC<{ analytics: AnalyticsData }> = ({ analytics }) => (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 
                  dark:border-gray-700/30 p-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                <ThumbsDown className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Articles Needing Improvement</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {analytics.leastHelpful?.map((item) => (
                <div
                    key={item.article._id}
                    className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 
                     border border-red-200 dark:border-red-700/50"
                >
                    <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                            {item.article.title}
                        </h4>
                        <span className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 
                           text-red-700 dark:text-red-400 rounded-full text-xs font-medium ml-2">
                            <ThumbsDown className="w-3 h-3" />
                            {item.notHelpfulCount}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                        <span>{item.article.category}</span>
                        <span>•</span>
                        <span>{item.notHelpfulCount} unhelpful votes</span>
                    </div>
                    <button className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 
                           px-2 py-1 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                        Review & Improve
                    </button>
                </div>
            ))}
        </div>
    </div>
);
