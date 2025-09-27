import { Bell, AlertTriangle, Info, Plus, BarChart3, FileText, MessageSquare } from 'lucide-react';

export const PRIORITY_CONFIG = {
    high: {
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      style:
        'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
    },
    medium: {
      icon: <Bell className="w-5 h-5 text-yellow-500" />,
      style:
        'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
    },
    low: {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      style:
        'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
    }
  };



export const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) return <h1 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-3">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">{line.replace('### ', '')}</h3>;
      
      const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');
      if (line.trim() === '') return <div key={index} className="h-3"></div>;
      if (line.startsWith('- ')) return <li key={index} className="text-gray-700 dark:text-gray-300 ml-4 mb-2">{line.replace('- ', '')}</li>;

      return <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: boldText }} />;
    });
  };



export const categories = [
  'All Categories',
  'IT Support',
  'HR',
  'Finance',
  'Operations',
  'Legal',
  'Marketing'
];

export const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Dashboard overview and quick stats'
    },
    {
      id: 'articles',
      label: 'Articles',
      icon: <FileText className="w-5 h-5" />,
      description: 'Manage knowledge base articles'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'View detailed analytics and insights'
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'Manage company announcements'
    }
  ] as const;


