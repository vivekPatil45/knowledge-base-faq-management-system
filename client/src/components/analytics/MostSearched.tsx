import React from 'react';
import { Search } from 'lucide-react';
import type { AnalyticsData } from '../../types';

export const MostSearched: React.FC<{ analytics: AnalyticsData }> = ({ analytics }) => (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 
                  dark:border-gray-700/30 p-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Search className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Most Searched Keywords</h3>
        </div>
        <div className="space-y-4">
            {analytics.mostSearched?.map((item, index) => (
                <div
                    key={item.keyword}
                    className="flex items-center justify-between p-3 rounded-lg 
                     bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 
                     dark:hover:bg-gray-700 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 
                           text-white text-sm font-bold rounded-full">
                            {index + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">{item.keyword}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                style={{ width: `${(item.count / analytics.mostSearched[0].count) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12 text-right">
                            {item.count}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
