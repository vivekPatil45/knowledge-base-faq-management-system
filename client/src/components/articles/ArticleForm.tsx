import React, { useState, useEffect } from 'react';
import { X, Save, Tag, FileText, FolderOpen } from 'lucide-react';
import { categories } from '../../data/dummyData';
import type { Article } from '../../types';

interface ArticleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'helpfulCount' | 'notHelpfulCount'>) => void;
  article?: Article | null;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  isOpen,
  onClose,
  onSave,
  article
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'IT Support',
    content: '',
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        category: article.category || 'IT Support',
        content: article.content,
        tags: article.tags || []
      });
    } else {
      setFormData({
        title: '',
        category: 'IT Support',
        content: '',
        tags: []
      });
    }
    setTagInput('');
    setErrors([]);
  }, [article, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];
    if (!formData.title.trim()) newErrors.push('Title is required');
    if (!formData.content.trim()) newErrors.push('Content is required');
    if (formData.tags.length === 0) newErrors.push('At least one tag is required');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tag]
        });
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0  z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 
                    animate-fade-in overflow-y-auto"
      
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 
                      w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 
                        bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {article ? 'Edit Article' : 'Create New Article'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors
                       text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Article Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter article title..."
              className="w-full px-4 py-3 rounded-lg dark:text-gray-300 border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <div className="relative">
              <FolderOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-lg border  dark:text-gray-300 border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent  
                         transition-all duration-200 appearance-none"
              >
                {categories.filter(cat => cat !== 'All Categories').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags * (Press Enter or comma to add)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags..."
                className="w-full pl-11 pr-4 py-3 rounded-lg border  dark:text-gray-300 border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>
            
            {/* Tag Display */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 
                               text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 
                               dark:hover:text-blue-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Article Content * (Markdown supported)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="# Article Title

## Section 1
Write your content here...

## Section 2
- Use markdown for formatting
- **Bold text**
- Lists and more"
              rows={16}
              className="w-full px-4 py-3 rounded-lg border  dark:text-gray-300 border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 resize-none font-mono text-sm"
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 
                            rounded-lg p-4">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                       text-white py-3 px-6 rounded-lg font-medium transition-all duration-200
                       transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <Save className="w-5 h-5" />
              {article ? 'Update Article' : 'Create Article'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                       rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
