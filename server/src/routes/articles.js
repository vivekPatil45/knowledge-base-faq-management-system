import express from 'express';
import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getArticles);
router.get('/:id', protect, getArticleById);
router.post('/', protect, admin, createArticle);
router.put('/:id', protect, admin, updateArticle);
router.delete('/:id', protect, admin, deleteArticle);

export default router;
