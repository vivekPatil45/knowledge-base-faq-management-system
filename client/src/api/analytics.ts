import axios from './axios';

export const getMostHelpfulArticles = async () => {
  const { data } = await axios.get('/analytics/articles/most-helpful');
  return data;
};

export const getLeastHelpfulArticles = async () => {
  const { data } = await axios.get('/analytics/articles/least-helpful');
  return data;
};

export const getMostSearchedKeywords = async () => {
  const { data } = await axios.get('/analytics/articles/most-searched');
  return data;
};



export const getAnalytics = async () => {
  const { data } = await axios.get('/analytics');
  return data;
};