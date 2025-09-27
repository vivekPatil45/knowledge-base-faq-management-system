import React from 'react';
import { StatCard } from './StatCard';
import type { Article } from '../../types';
import { FileText, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { RecentArticles } from '../articles/RecentArticles';
import { ArticleManagement } from './ArticleManagementProps';
import { Announcements } from '../announcements/Announcements';
import { Analytics } from '../analytics/Analytics';

interface DashboardContentProps {
    currentView: string;
    articles: Article[];
    onAddArticle: any;
    onEditArticle: any;
    onDeleteArticle: any;
    onViewArticle: any;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
    currentView,
    articles,
    onAddArticle,
    onEditArticle,
    onDeleteArticle,
    onViewArticle,
}) => {
    if (currentView === 'overview') {
        return (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Articles" value={articles.length} icon={<FileText className="w-6 h-6 text-white" />} color="bg-gradient-to-br from-blue-500 to-blue-600" />
                    <StatCard title="Total Feedback" value={articles.reduce((sum, a) => sum + a.helpfulCount + a.notHelpfulCount, 0)} icon={<Users className="w-6 h-6 text-white" />} color="bg-gradient-to-br from-green-500 to-green-600" />
                    <StatCard title="Helpful Votes" value={articles.reduce((sum, a) => sum + a.helpfulCount, 0)} icon={<MessageSquare className="w-6 h-6 text-white" />} color="bg-gradient-to-br from-purple-500 to-purple-600" />
                    <StatCard title="Avg. Rating" value={92} icon={<BarChart3 className="w-6 h-6 text-white" />} color="bg-gradient-to-br from-orange-500 to-orange-600" />
                </div>

                <RecentArticles articles={articles} onManageClick={() => { }} onViewArticle={onViewArticle} />
            </div>
        );
    }

    if (currentView === 'articles') {
        return (
            <ArticleManagement
                articles={articles}
                onAddArticle={onAddArticle}
                onEditArticle={onEditArticle}
                onDeleteArticle={onDeleteArticle}
                onViewArticle={onViewArticle}
            />
        );
    }

    if (currentView === 'analytics') return <Analytics />;
    if (currentView === 'announcements') return <Announcements />;

    return null;
};
