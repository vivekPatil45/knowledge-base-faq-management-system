import React, { useEffect, useState } from 'react';
import { BarChart3, FileText, Search, Users, Target } from 'lucide-react';
import { getAnalytics } from '../../api/analytics';
import type { AnalyticsData } from '../../types';
import { StatCard } from './StatCard';
import { MostSearched } from './MostSearched';
import { MostHelpful } from './MostHelpful';
import { LeastHelpful } from './LeastHelpful';

export const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !analytics) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Loading analytics...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <BarChart3 className="w-8 h-8" />
          Analytics Dashboard
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Articles"
          value={analytics.totalArticles}
          icon={<FileText className="w-6 h-6 text-white" />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Searches"
          value={analytics.totalSearches?.toLocaleString() || 0}
          icon={<Search className="w-6 h-6 text-white" />}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Total Feedback"
          value={analytics.totalFeedbacks?.toLocaleString() || 0}
          icon={<Users className="w-6 h-6 text-white" />}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Avg. Helpfulness"
          value={`${analytics.avgHelpfulness || 0}%`}
          icon={<Target className="w-6 h-6 text-white" />}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <MostSearched analytics={analytics} />
        <MostHelpful analytics={analytics} />
      </div>

      <LeastHelpful analytics={analytics} />
    </div>
  );
};
