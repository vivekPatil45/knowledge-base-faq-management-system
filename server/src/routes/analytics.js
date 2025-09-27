import express from 'express';
import { mostHelpfulArticles, leastHelpfulArticles, mostSearchedKeywords, getAnalytics } from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/articles/most-helpful', protect, admin, mostHelpfulArticles);
router.get('/articles/least-helpful', protect, admin, leastHelpfulArticles);
router.get('/articles/most-searched', protect, admin, mostSearchedKeywords);
router.get('/', protect, admin, getAnalytics);


export default router;
