import axios from './axios';

export const addFeedback = async (articleId: string, feedback: 'helpful' | 'not helpful') => {
  const { data } = await axios.post('/feedback', { articleId, feedback });
  return data;
};

export const getFeedback = async (articleId: string) => {
  const { data } = await axios.get(`/feedback/article/${articleId}`);
  return data; // { helpful: number, notHelpful: number }
};
