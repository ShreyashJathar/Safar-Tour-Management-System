import express from 'express';
import { 
  sendOtp, 
  verifyOtp, 
  registerUser, 
  loginUser,
  sendResetPasswordOtp,
  resetPasswordWithOtp
} from '../controllers/authController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-reset-otp', sendResetPasswordOtp);
router.post('/reset-password', resetPasswordWithOtp);

export default router;

