import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  purpose: { type: String, enum: ['register', 'forgot'], required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model('OTP', otpSchema);
