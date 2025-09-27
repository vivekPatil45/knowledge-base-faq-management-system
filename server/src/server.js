import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';
import feedbackRoutes from './routes/feedback.js';
import announcementRoutes from './routes/announcements.js';
import analyticsRoutes from './routes/analytics.js';
import otpRoutes from './routes/otp.js';

import morgan from 'morgan'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/otp', otpRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
