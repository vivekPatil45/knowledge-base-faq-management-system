import Feedback from "../models/Feedback.js";

// Add feedback
export const addFeedback = async (req, res) => {
  try {
    const { articleId, feedback } = req.body;

    const existing = await Feedback.findOne({ articleId, userId: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'You already submitted feedback for this article' });
    }

    const newFeedback = await Feedback.create({
      articleId,
      userId: req.user._id,
      feedback
    });

    res.status(201).json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error adding feedback' });
  }
};

// Get feedback counts for an article
export const getFeedbackByArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const helpfulCount = await Feedback.countDocuments({ articleId, feedback: 'helpful' });
    const notHelpfulCount = await Feedback.countDocuments({ articleId, feedback: 'not helpful' });

    res.json({ articleId, helpful: helpfulCount, notHelpful: notHelpfulCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching feedback' });
  }
};
