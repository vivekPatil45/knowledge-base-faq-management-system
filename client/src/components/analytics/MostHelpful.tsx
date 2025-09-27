import React from 'react';
import { ThumbsUp } from 'lucide-react';
import type { AnalyticsData } from '../../types';

export const MostHelpful: React.FC<{ analytics: AnalyticsData }> = ({ analytics }) => (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 
                  dark:border-gray-700/30 p-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <ThumbsUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Most Helpful Articles</h3>
        </div>
        <div className="space-y-4">
            {analytics.mostHelpful?.map((item) => (
                <div
                    key={item.article._id}
                    className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 
                     border border-green-200 dark:border-green-700/50"
                >
                    <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                            {item.article.title}
                        </h4>
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 
                           text-green-700 dark:text-green-400 rounded-full text-xs font-medium ml-2">
                            <ThumbsUp className="w-3 h-3" />
                            {item.helpfulCount}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                        <span>{item.article.category}</span>
                        <span>•</span>
                        <span>{item.helpfulCount} helpful votes</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
