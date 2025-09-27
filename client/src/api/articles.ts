import axios from './axios';
import type { Article } from '../types';

export const getArticles = async (search?: string, category?: string): Promise<Article[]> => {
  const params: any = {};
  if (search) params.search = search;
  if (category && category !== 'All Categories') params.category = category;

  const { data } = await axios.get('/articles', { params });
  console.log("data api",data);
  
  return data.map((item: any) => ({
    ...item,
    id: item._id,
    authorId: item.createdBy?._id || '',
    helpfulCount: item.helpfulCount || 0,
    notHelpfulCount: item.notHelpfulCount || 0,
  }));
};

export const getArticleById = async (id: string): Promise<Article> => {
  const { data } = await axios.get(`/articles/${id}`);
  return {
    ...data,
    id: data._id,
    authorId: data.createdBy?._id || '',
    helpfulCount: data.helpfulCount || 0,
    notHelpfulCount: data.notHelpfulCount || 0,
  };
};

export const createArticle = async (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'helpfulCount' | 'notHelpfulCount'>) => {
  const { data } = await axios.post('/articles', articleData);
  return {
    ...data,
    id: data._id,
    authorId: data.createdBy?._id || '',
    helpfulCount: data.helpfulCount || 0,
    notHelpfulCount: data.notHelpfulCount || 0,
  };
};


export const updateArticle = async (
  id: string,
  articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'helpfulCount' | 'notHelpfulCount'>
) => {
  const { data } = await axios.put(`/articles/${id}`, articleData);
  return {
    ...data,
    id: data._id,
    authorId: data.createdBy?._id || '',
    helpfulCount: data.helpfulCount || 0,
    notHelpfulCount: data.notHelpfulCount || 0,
  };
};

export const deleteArticle = async (id: string) => {
  await axios.delete(`/articles/${id}`);
};
