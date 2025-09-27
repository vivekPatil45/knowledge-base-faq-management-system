import express from 'express';
import { addFeedback, getFeedbackByArticle } from '../controllers/feedbackController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addFeedback);
router.get('/article/:id', protect, getFeedbackByArticle);

export default router;
