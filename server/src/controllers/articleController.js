import Article from "../models/Article.js";
import Feedback from "../models/Feedback.js";
import SearchLog from "../models/SearchLog.js";
// List articles with helpful/notHelpful counts
export const getArticles = async (req, res) => {
  try {
    const { search, category, userId } = req.query;
    const match = {};

    // Match search query
    if (search) {
      match.title = { $regex: search, $options: 'i' };

      // Log search term
      await SearchLog.create({
        keyword: search,
        userId: userId || null,
      });
    }

    // Match category filter
    if (category && category !== 'All Categories') {
      match.category = category;

      // Optional: log category as search
      await SearchLog.create({
        keyword: category,
        userId: userId || null,
      });
    }

    const articles = await Article.aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'feedbacks',
          localField: '_id',
          foreignField: 'articleId',
          as: 'feedbacks',
        },
      },
      {
        $addFields: {
          helpfulCount: {
            $size: {
              $filter: { input: '$feedbacks', cond: { $eq: ['$$this.feedback', 'helpful'] } },
            },
          },
          notHelpfulCount: {
            $size: {
              $filter: { input: '$feedbacks', cond: { $eq: ['$$this.feedback', 'not helpful'] } },
            },
          },
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);

    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching articles' });
  }
};
// Get single article
export const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id).populate('createdBy', 'name email');
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
};

// Admin: create article
export const createArticle = async (req, res) => {
  const { title, category, content, tags } = req.body;
  const article = await Article.create({ title, category, content, tags, createdBy: req.user._id });
  res.status(201).json(article);
};

// Admin: update article
export const updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });

  Object.assign(article, req.body);
  const updated = await article.save();
  res.json(updated);
};
export const deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: 'Article not found' });

    res.json({ message: 'Article removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};