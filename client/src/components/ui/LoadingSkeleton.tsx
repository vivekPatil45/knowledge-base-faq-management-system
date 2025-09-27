import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'text' | 'announcement';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 3, 
  type = 'card' 
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => index);

  if (type === 'card') {
    return (
      <div className="space-y-4">
        {skeletons.map((index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-lg w-3/4 shimmer"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-20 shimmer"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full shimmer"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3 shimmer"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-16 shimmer"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-20 shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'announcement') {
    return (
      <div className="space-y-3">
        {skeletons.map((index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
                     border border-blue-200 dark:border-blue-700 rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-5 bg-blue-200 dark:bg-blue-600 rounded w-2/3 shimmer"></div>
              <div className="h-4 bg-blue-200 dark:bg-blue-600 rounded w-20 shimmer"></div>
            </div>
            <div className="h-4 bg-blue-200 dark:bg-blue-600 rounded w-full shimmer"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {skeletons.map((index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 dark:bg-gray-600 rounded shimmer"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      ))}
    </div>
  );
};