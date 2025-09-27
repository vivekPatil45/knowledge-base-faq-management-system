import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  feedback: { type: String, enum: ['helpful','not helpful'], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackSchema);
