import React from 'react';
import { Calendar, X } from 'lucide-react';
import type { Announcement } from '../../types';

interface Props {
    announcement: Announcement;
    isAdmin: boolean;
    onDelete: (id: string) => void;
    getPriorityIcon: (priority: 'low' | 'medium' | 'high') => React.ReactNode;
    getPriorityStyles: (priority: 'low' | 'medium' | 'high') => string;
}

export const AnnouncementCard: React.FC<Props> = ({
    announcement,
    isAdmin,
    onDelete,
    getPriorityIcon,
    getPriorityStyles
}) => {
    return (
        <div
            className={`
        ${getPriorityStyles(announcement.priority)} 
        border rounded-xl p-5 shadow-md transition-all duration-500 
        ease-out transform hover:scale-[1.02] hover:shadow-lg group
      `}
        >
            <div className="flex items-start justify-between">
                {/* Left side */}
                <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm ring-2 ring-offset-2 ring-primary/30 dark:bg-gray-800">
                            {getPriorityIcon(announcement.priority)}
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                            {announcement.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                            {announcement.content}
                        </p>

                        {/* Date */}
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                <Calendar className="w-3 h-3" />
                                {new Date(announcement.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right side (delete button) */}
                {isAdmin && (
                    <button
                        onClick={() => onDelete(announcement.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                        aria-label="Delete announcement"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};
