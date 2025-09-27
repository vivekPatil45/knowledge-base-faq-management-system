import React from 'react';
import { Search, Filter, Tag } from 'lucide-react';
import type { SearchFilters } from '../../types';
import { categories } from '../../utils/utils';

interface SearchFilterProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  totalResults?: number;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  filters,
  onFiltersChange,
  totalResults
}) => {
  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 
                    dark:border-gray-700/30 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Knowledge Base
          </label>
          <div className="flex items-center w-full rounded-lg border border-gray-300 dark:border-gray-600 
                          bg-white/50 dark:bg-gray-700 backdrop-blur-sm 
                          focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
            <Search className="ml-3 w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => onFiltersChange({ ...filters, keyword: e.target.value })}
              placeholder="Search articles, tags, or keywords..."
              className="flex-1 bg-white dark:bg-gray-700 bg-transparent border-none focus:outline-none px-3 py-3 text-gray-600 dark:text-gray-300"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full lg:w-64">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <div className="flex items-center w-full rounded-lg border border-gray-300 dark:border-gray-600 
                          bg-white/50 dark:bg-gray-700 backdrop-blur-sm 
                          focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
            <Filter className="ml-3 w-5 h-5 text-gray-400 shrink-0" />
            <select
              value={filters.category}
              onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
              // className="flex-1 bg-transparent border-none focus:outline-none px-3 py-3 text-gray-600 dark:text-gray-300 appearance-none"
              className="flex-1 bg-transparent border-none focus:outline-none px-3 py-3 text-gray-600 dark:text-gray-300 appearance-none
             bg-white dark:bg-gray-700"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      {totalResults !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Tag className="w-4 h-4" />
            <span>
              {totalResults} {totalResults === 1 ? 'article' : 'articles'} found
              {filters.keyword && ` for "${filters.keyword}"`}
              {filters.category !== 'All Categories' && ` in ${filters.category}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
