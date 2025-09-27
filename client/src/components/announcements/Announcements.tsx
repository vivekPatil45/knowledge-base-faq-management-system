import React, { useState, useEffect } from 'react';
import { Bell, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { AnnouncementCard } from './AnnouncementCard';
import { AnnouncementForm } from './AnnouncementForm';
import { createAnnouncement, deleteAnnouncement, getAnnouncements } from '../../api/announcements';
import toast from 'react-hot-toast';
import type { Announcement } from '../../types';
import { PRIORITY_CONFIG } from '../../utils/utils';

export const Announcements: React.FC = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const data = await getAnnouncements();
      setAnnouncements(
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (err) {
      console.error('Failed to fetch announcements', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim())
      return;
    try {
      setIsSubmitting(true);
      const created = await createAnnouncement(newAnnouncement);
      setAnnouncements([created, ...announcements]);
      toast.success('Announcement created successfully!');
      setNewAnnouncement({ title: '', content: '', priority: 'medium' });
      setShowAddForm(false);
    } catch (err: any) {
      toast.error('Failed to create announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter((a) => a.id !== id));
      toast.success('Announcement deleted!');
    } catch (err) {
      toast.error('Failed to delete announcement');
    }
  };

  const getPriorityIcon = (priority: 'low' | 'medium' | 'high') =>
    PRIORITY_CONFIG[priority].icon;
  const getPriorityStyles = (priority: 'low' | 'medium' | 'high') =>
    PRIORITY_CONFIG[priority].style;

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 sm:w-6 h-5 sm:h-6" />
          Announcements
        </h2>
        <LoadingSkeleton type="announcement" count={3} />
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-5 sm:w-6 h-5 sm:h-6" />
          Announcements
        </h2>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 
                       hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 
                       rounded-lg font-medium transition-all duration-200 transform hover:scale-105 
                       flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Announcement
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && user?.role === 'admin' && (
        <AnnouncementForm
          title={newAnnouncement.title}
          content={newAnnouncement.content}
          priority={newAnnouncement.priority}
          isSubmitting={isSubmitting}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddAnnouncement}
          onChange={(field, value) =>
            setNewAnnouncement({ ...newAnnouncement, [field]: value })
          }
        />
      )}

      {/* Announcement List */}
      <div className="space-y-3">
        {announcements.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <Bell className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              No announcements to display
            </p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              isAdmin={user?.role === 'admin'}
              onDelete={handleDeleteAnnouncement}
              getPriorityIcon={getPriorityIcon}
              getPriorityStyles={getPriorityStyles}
            />
          ))
        )}
      </div>
    </div>
  );
};
