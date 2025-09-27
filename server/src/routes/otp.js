// routes/otpRoutes.js
import express from 'express';
import {
  sendRegisterOTP,
  verifyRegisterOTP,
  sendForgotOTP,
  verifyForgotOTP
} from '../controllers/otpController.js';

const router = express.Router();

router.post('/register/send-otp', sendRegisterOTP);
router.post('/register/verify-otp', verifyRegisterOTP);
router.post('/forgot/send-otp', sendForgotOTP);
router.post('/forgot/verify-otp', verifyForgotOTP);

export default router;
