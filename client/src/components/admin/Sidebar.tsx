import React from 'react';
import { navigationItems } from '../../utils/utils';
import type { AdminView } from '../../types';
import { FileText, Users, MessageSquare, BarChart3 } from 'lucide-react';

interface SidebarProps {
    currentView: AdminView;
    setCurrentView: (view: AdminView) => void;
    userName?: string;
    articlesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
    currentView,
    setCurrentView,
    userName,
    articlesCount,
}) => {
    const totalArticles = articlesCount || 0;

    return (
        <div className="w-full md:w-80 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/30 p-6 overflow-y-auto flex-shrink-0">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back, {userName}</p>
            </div>

            <nav className="space-y-3">
                {navigationItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id as AdminView)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${currentView === item.id
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[1.02]'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:transform hover:scale-[1.02]'
                            }`}
                    >
                        {item.icon}
                        <div>
                            <div className="font-medium">{item.label}</div>
                            <div
                                className={`text-xs ${currentView === item.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                {item.description}
                            </div>
                        </div>
                    </button>
                ))}
            </nav>


        </div>
    );
};


