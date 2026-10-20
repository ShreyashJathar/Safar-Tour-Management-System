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

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-reset-otp', sendResetPasswordOtp);
router.post('/reset-password', resetPasswordWithOtp);
router.post('/send-whatsapp-otp', sendWhatsAppOtpController);
router.post('/verify-whatsapp-otp', verifyWhatsAppOtpController);

export default router;

