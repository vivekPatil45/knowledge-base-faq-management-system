// controllers/otpController.js
import OTP from '../models/OTP.js';
import User from '../models/User.js';
import { generateForgotOTPEmail, generateRegisterOTPEmail } from '../utils/emailTemplates.js';
import { sendEmail } from '../utils/sendEmail.js';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendRegisterOTP = async (req, res) => {
  const { email } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const code = generateOTP();
  const otp = new OTP({ email, code, purpose: 'register', expiresAt: new Date(Date.now() + 10*60*1000) }); // 10 min
  await otp.save();

  // await sendEmail(email, 'Verify Your Email', `Your OTP is: ${code}`);
  await sendEmail(email, 'Verify Your Email', generateRegisterOTPEmail(code, email));

  res.json({ message: 'OTP sent to your email' });
};

export const verifyRegisterOTP = async (req, res) => {
  const { email, code } = req.body;
  const otp = await OTP.findOne({ email, code, purpose: 'register' });

  if (!otp || otp.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  await OTP.deleteMany({ email, purpose: 'register' });
  res.json({ message: 'OTP verified' });
};

export const sendForgotOTP = async (req, res) => {
  const { email } = req.body;
  if (!(await User.findOne({ email }))) {
    return res.status(400).json({ message: 'Email not registered' });
  }

  const code = generateOTP();
  const otp = new OTP({ email, code, purpose: 'forgot', expiresAt: new Date(Date.now() + 10*60*1000) });
  await otp.save();

  // await sendEmail(email, 'Reset Password OTP', `Your OTP is: ${code}`);
  await sendEmail(email, 'Reset Password OTP', generateForgotOTPEmail(code, email));

  res.json({ message: 'OTP sent to your email' });
};

export const verifyForgotOTP = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const otp = await OTP.findOne({ email, code, purpose: 'forgot' });

  if (!otp || otp.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const user = await User.findOne({ email });
  user.password = newPassword; // will hash via pre-save
  await user.save();

  await OTP.deleteMany({ email, purpose: 'forgot' });
  res.json({ message: 'Password reset successfully' });
};
