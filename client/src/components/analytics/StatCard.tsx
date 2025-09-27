import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 
                  dark:border-gray-700/30 p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
                {trend && (
                    <p
                        className={`text-xs mt-1 flex items-center gap-1 ${trend.startsWith('+')
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                    >
                        <TrendingUp className="w-3 h-3" />
                        {trend}
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        </div>
    </div>
);
