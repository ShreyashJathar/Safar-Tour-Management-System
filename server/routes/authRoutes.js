import express from 'express';
import { 
  sendOtp, 
  verifyOtp, 
  registerUser, 
  loginUser,
  sendResetPasswordOtp,
  resetPasswordWithOtp,
  sendWhatsAppOtpController,
  verifyWhatsAppOtpController
} from '../controllers/authController.js';
import { createRateLimiter } from '../utils/security.js';

const router = express.Router();

// Bank-grade rate limiting shields
const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please wait 15 minutes before trying again.'
});

const otpRequestLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: 'Too many verification code requests. Please wait a few minutes before trying again.'
});

router.post('/send-otp', otpRequestLimiter, sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', loginLimiter, registerUser);
router.post('/login', loginLimiter, loginUser);
router.post('/send-reset-otp', otpRequestLimiter, sendResetPasswordOtp);
router.post('/reset-password', loginLimiter, resetPasswordWithOtp);
router.post('/send-whatsapp-otp', otpRequestLimiter, sendWhatsAppOtpController);
router.post('/verify-whatsapp-otp', verifyWhatsAppOtpController);

export default router;

