export interface User {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  name: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  helpfulCount: number;
  notHelpfulCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  authorId: string;
  priority: 'low' | 'medium' | 'high';
}

export interface SearchFilters {
  keyword: string;
  category: string;
}



// types/analytics.ts
export interface ArticleAnalytics {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
}

export interface HelpfulArticle {
  helpfulCount: number;
  article: ArticleAnalytics;
}

export interface LeastHelpfulArticle {
  notHelpfulCount: number;
  article: ArticleAnalytics;
}

export interface SearchedKeyword {
  keyword: string;
  count: number;
}

export interface AnalyticsData {
  totalArticles: number;
  totalFeedbacks: number;
  avgHelpfulness: number; // percentage, e.g., 78
  totalSearches: number;
  mostSearched: SearchedKeyword[];
  mostHelpful: HelpfulArticle[];
  leastHelpful: LeastHelpfulArticle[];
}

export type AdminView = 'overview' | 'articles' | 'analytics' | 'announcements';
