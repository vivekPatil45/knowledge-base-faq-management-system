import axios from './axios';
import type { Announcement } from '../types';

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const { data } = await axios.get('/announcements');
  return data.map((item: any) => ({
    ...item,
    id: item._id,
    authorId: item.createdBy?._id || '',
    priority: item.priority || 'low',
  }));
};

export const createAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt' | 'authorId'>) => {
  const { data } = await axios.post('/announcements', announcementData);
  return {
    ...data,
    id: data._id,
    authorId: data.createdBy?._id || '',
  };
};

export const deleteAnnouncement = async (id: string) => {
  await axios.delete(`/announcements/${id}`);
};
