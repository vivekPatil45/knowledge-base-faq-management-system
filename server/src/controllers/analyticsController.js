
import Article from '../models/Article.js';
import Feedback from '../models/Feedback.js';
import SearchLog from '../models/SearchLog.js';

// Most helpful articles
export const mostHelpfulArticles = async (req, res) => {
  const aggregation = await Feedback.aggregate([
    { $match: { feedback: 'helpful' } },
    { $group: { _id: '$articleId', helpfulCount: { $sum: 1 } } },
    { $sort: { helpfulCount: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'articles', // collection name
        localField: '_id',
        foreignField: '_id',
        as: 'article',
      },
    },
    { $unwind: '$article' },
    {
      $project: {
        _id: 0,
        helpfulCount: 1,
        article: {
          _id: '$article._id',
          title: '$article.title',
          category: '$article.category',
          createdAt: '$article.createdAt',
        },
      },
    },
  ]);

  res.json(aggregation);
};

// Least helpful articles
export const leastHelpfulArticles = async (req, res) => {
  const aggregation = await Feedback.aggregate([
    { $match: { feedback: 'not helpful' } },
    { $group: { _id: '$articleId', notHelpfulCount: { $sum: 1 } } },
    { $sort: { notHelpfulCount: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'articles',
        localField: '_id',
        foreignField: '_id',
        as: 'article',
      },
    },
    { $unwind: '$article' },
    {
      $project: {
        _id: 0,
        notHelpfulCount: 1,
        article: {
          _id: '$article._id',
          title: '$article.title',
          category: '$article.category',
          createdAt: '$article.createdAt',
        },
      },
    },
  ]);

  res.json(aggregation);
};


// Most searched keywords based on actual user searches
export const mostSearchedKeywords = async (req, res) => {
  try {
    const keywords = await SearchLog.aggregate([
      { $group: { _id: '$keyword', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, keyword: '$_id', count: 1 } },
    ]);

    res.json(keywords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching searched keywords' });
  }
};


export const getAnalytics = async (req, res) => {
  try {
    // 1️⃣ Total Articles
    const totalArticles = await Article.countDocuments();

    // 2️⃣ Most helpful articles
    const mostHelpful = await Feedback.aggregate([
      { $match: { feedback: 'helpful' } },
      { $group: { _id: '$articleId', helpfulCount: { $sum: 1 } } },
      { $sort: { helpfulCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: '_id',
          as: 'article',
        },
      },
      { $unwind: '$article' },
      {
        $project: {
          _id: 0,
          helpfulCount: 1,
          article: {
            _id: '$article._id',
            title: '$article.title',
            category: '$article.category',
            createdAt: '$article.createdAt',
          },
        },
      },
    ]);

    // 3️⃣ Least helpful articles
    const leastHelpful = await Feedback.aggregate([
      { $match: { feedback: 'not helpful' } },
      { $group: { _id: '$articleId', notHelpfulCount: { $sum: 1 } } },
      { $sort: { notHelpfulCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: '_id',
          as: 'article',
        },
      },
      { $unwind: '$article' },
      {
        $project: {
          _id: 0,
          notHelpfulCount: 1,
          article: {
            _id: '$article._id',
            title: '$article.title',
            category: '$article.category',
            createdAt: '$article.createdAt',
          },
        },
      },
    ]);

    // 4️⃣ Total Feedbacks
    const totalFeedbacks = await Feedback.countDocuments();

    // 5️⃣ Average Helpfulness %
    const avgHelpfulness = totalFeedbacks
      ? Math.round((mostHelpful.reduce((sum, a) => sum + a.helpfulCount, 0) / totalFeedbacks) * 100)
      : 0;

    // 6️⃣ Most searched keywords
    const mostSearched = await SearchLog.aggregate([
      { $group: { _id: '$keyword', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, keyword: '$_id', count: 1 } },
    ]);

    const totalSearches = await SearchLog.countDocuments();

    // 7️⃣ Send all analytics in one response
    res.json({
      totalSearches,
      totalArticles,
      totalFeedbacks,
      avgHelpfulness,
      mostSearched,
      mostHelpful,
      leastHelpful,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};
