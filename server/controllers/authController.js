import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { pool } from '../config/db.js';
import { sendWhatsAppOtp as dispatchWhatsAppOtp } from '../services/whatsappService.js';
import { 
  signJwt, 
  generateSecureOtp, 
  validatePassword, 
  recordOtpAttempt, 
  resetOtpAttempts 
} from '../utils/security.js';

// In-memory OTP storage for active verification cycles
const otpStore = new Map();
const whatsappOtpStore = new Map();

// Helper to load credentials.json if available
const loadGoogleCredentials = () => {
  try {
    const credPath = path.join(process.cwd(), 'credentials.json');
    if (fs.existsSync(credPath)) {
      const raw = fs.readFileSync(credPath, 'utf8');
      const parsed = JSON.parse(raw);
      return parsed.installed || parsed.web || null;
    }
  } catch (err) {
    console.warn("[Google OAuth] Could not parse credentials.json:", err.message);
  }
  return null;
};

// Email transporter factory
const createEmailTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const googleCreds = loadGoogleCredentials();

  if (emailUser && emailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID || (googleCreds ? googleCreds.client_id : null);
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || (googleCreds ? googleCreds.client_secret : null);
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (emailUser && clientId && clientSecret && refreshToken) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: emailUser,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
      }
    });
  }

  return null;
};

/**
 * Send OTP verification code to user email
 */
export async function sendOtp(req, res) {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: "Valid email address is required" });
  }

  const generatedOtp = generateSecureOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes secure lifetime

  otpStore.set(email.toLowerCase(), { otp: generatedOtp, expiresAt });
  console.log(`[OTP] Generated 6-digit secure code for ${email}`);

  let emailSent = false;
  const transporter = createEmailTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Safar Luxury Travel" <${process.env.EMAIL_USER || "notificationsafar@gmail.com"}>`,
        to: email,
        subject: `${generatedOtp} is your Safar Verification Code`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #0f172a; border-radius: 16px; color: #f8fafc; border: 1px solid #1e293b;">
            <h2 style="color: #00df89; margin: 0 0 16px 0; font-size: 24px;">🌍 Safar Luxury Travel</h2>
            <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">Use the following 6-digit verification code to securely access your Safar account:</p>
            <div style="background: rgba(0, 223, 137, 0.1); border: 2px dashed #00df89; border-radius: 12px; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #00df89; padding: 20px; text-align: center; margin: 24px 0;">
              ${generatedOtp}
            </div>
            <p style="font-size: 13px; color: #64748b; margin: 0;">Code expires in 5 minutes. Do not share this code with anyone.</p>
          </div>
        `
      });
      emailSent = true;
      console.log(`[SMTP] Verification email delivered to ${email}`);
    } catch (mailErr) {
      console.error("[SMTP Error]:", mailErr.message);
    }
  }

  res.status(200).json({
    success: true,
    message: `6-digit verification code sent to ${email}. Please check your inbox.`
  });
}

/**
 * Verify OTP and authenticate user
 */
export async function verifyOtp(req, res) {
  const { email, otp, fullName } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP code are required" });
  }

  const emailKey = email.toLowerCase().trim();
  const attemptCheck = recordOtpAttempt(emailKey);
  if (attemptCheck.locked) {
    return res.status(429).json({ 
      success: false, 
      message: `Too many failed attempts. Account temporarily locked for ${attemptCheck.remainingSec}s.` 
    });
  }

  const record = otpStore.get(emailKey);
  if (!record) {
    return res.status(400).json({ success: false, message: "OTP not requested or expired. Please request a new one." });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(emailKey);
    return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
  }

  if (record.otp !== otp.toString().trim()) {
    if (attemptCheck.attemptsRemaining <= 0) {
      otpStore.delete(emailKey);
      return res.status(429).json({ 
        success: false, 
        message: "Maximum OTP attempts exceeded. Code has been invalidated for security." 
      });
    }
    return res.status(400).json({ 
      success: false, 
      message: `Invalid OTP code. (${attemptCheck.attemptsRemaining} attempt(s) remaining)` 
    });
  }

  // OTP verified - burn immediately and reset attempts
  otpStore.delete(emailKey);
  resetOtpAttempts(emailKey);

  let dbUser = null;
  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [emailKey]);

    if (existing.length > 0) {
      dbUser = existing[0];
      await pool.query(
        'UPDATE users SET is_verified = 1, last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [dbUser.id]
      );
    } else {
      const nameToSave = fullName?.trim() || emailKey.split('@')[0];
      const roleToAssign = 'Customer';

      const [result] = await pool.query(
        'INSERT INTO users (fullName, email, auth_provider, is_verified, role) VALUES (?, ?, "google", 1, ?)',
        [nameToSave, emailKey, roleToAssign]
      );

      dbUser = {
        id: result.insertId,
        fullName: nameToSave,
        email: emailKey,
        role: roleToAssign,
        auth_provider: 'google',
        is_verified: 1
      };
    }
  } catch (dbErr) {
    console.error("[Database Error] Failed to persist OTP user:", dbErr.message);
    dbUser = {
      id: Date.now(),
      fullName: fullName || emailKey.split('@')[0],
      email: emailKey,
      role: 'Customer',
      auth_provider: 'google',
      is_verified: 1
    };
  }

  const token = signJwt({ id: dbUser.id, email: dbUser.email, role: dbUser.role });

  res.status(200).json({
    success: true,
    message: "OTP verification successful!",
    token,
    user: dbUser
  });
}

/**
 * Register a new user with password
 */
export async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const passCheck = validatePassword(password);
  if (!passCheck.valid) {
    return res.status(400).json({ success: false, message: passCheck.message });
  }

  try {
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ success: false, message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const role = 'Customer';

    const [result] = await pool.query(
      'INSERT INTO users (fullName, email, password, role, is_verified) VALUES (?, ?, ?, ?, 1)',
      [fullName.trim(), email.toLowerCase().trim(), hashedPassword, role]
    );

    const userObj = {
      id: result.insertId,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      role
    };

    const token = signJwt(userObj);

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      token,
      user: userObj
    });
  } catch (error) {
    console.error("[Register Error]:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * User login with Email/Password
 */
export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR fullName = ?',
      [email.toLowerCase().trim(), email.trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email/username or password" });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid email/username or password" });
    }

    await pool.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    const userObj = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role || 'Customer'
    };

    const token = signJwt(userObj);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: userObj
    });
  } catch (error) {
    console.error("[Login Error]:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * Send Password Reset OTP to Gmail
 */
export async function sendResetPasswordOtp(req, res) {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: "Valid Gmail/email address is required" });
  }

  const generatedOtp = generateSecureOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(`reset_${email.toLowerCase().trim()}`, { otp: generatedOtp, expiresAt });
  console.log(`[RESET OTP] Generated 6-digit code for ${email}`);

  let emailSent = false;
  const transporter = createEmailTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Safar Luxury Travel" <${process.env.EMAIL_USER || "notificationsafar@gmail.com"}>`,
        to: email,
        subject: `${generatedOtp} is your Safar Password Reset Code`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #0f172a; border-radius: 16px; color: #f8fafc; border: 1px solid #1e293b;">
            <h2 style="color: #00df89; margin: 0 0 16px 0; font-size: 24px;">🌍 Safar Password Reset</h2>
            <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">Use this 6-digit verification code to reset your account password:</p>
            <div style="background: rgba(0, 223, 137, 0.1); border: 2px dashed #00df89; border-radius: 12px; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #00df89; padding: 20px; text-align: center; margin: 24px 0;">
              ${generatedOtp}
            </div>
            <p style="font-size: 13px; color: #64748b; margin: 0;">Code expires in 5 minutes. If you did not request this, please ignore this email.</p>
          </div>
        `
      });
      emailSent = true;
      console.log(`[SMTP] Reset email delivered to ${email}`);
    } catch (mailErr) {
      console.error("[SMTP Error]:", mailErr.message);
    }
  }

  res.status(200).json({
    success: true,
    message: `6-digit password reset OTP sent to ${email}. Please check your inbox.`
  });
}

/**
 * Verify OTP and update user password
 */
export async function resetPasswordWithOtp(req, res) {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: "Email, OTP code, and new password are required" });
  }

  const passCheck = validatePassword(newPassword);
  if (!passCheck.valid) {
    return res.status(400).json({ success: false, message: passCheck.message });
  }

  const emailKey = `reset_${email.toLowerCase().trim()}`;
  const attemptCheck = recordOtpAttempt(emailKey);
  if (attemptCheck.locked) {
    return res.status(429).json({ 
      success: false, 
      message: `Too many failed attempts. Try again in ${attemptCheck.remainingSec}s.` 
    });
  }

  const record = otpStore.get(emailKey);
  if (!record) {
    return res.status(400).json({ success: false, message: "Reset OTP not requested or expired" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(emailKey);
    return res.status(400).json({ success: false, message: "Reset OTP has expired. Please request a new one." });
  }

  if (record.otp !== otp.toString().trim()) {
    if (attemptCheck.attemptsRemaining <= 0) {
      otpStore.delete(emailKey);
      return res.status(429).json({ 
        success: false, 
        message: "Maximum OTP attempts exceeded. Code has been invalidated." 
      });
    }
    return res.status(400).json({ 
      success: false, 
      message: `Invalid OTP code. (${attemptCheck.attemptsRemaining} attempts left)` 
    });
  }

  otpStore.delete(emailKey);
  resetOtpAttempts(emailKey);

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email.toLowerCase().trim()]);

    res.status(200).json({
      success: true,
      message: "Password reset successfully! You can now log in with your new password."
    });
  } catch (error) {
    console.error("[Reset Password Error]:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/**
 * Send WhatsApp OTP to phone number
 */
export async function sendWhatsAppOtpController(req, res) {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: "Valid mobile phone number is required" });
  }

  const cleanPhone = phone.toString().replace(/\D/g, '');
  if (cleanPhone.length < 7) {
    return res.status(400).json({ success: false, message: "Phone number is too short" });
  }

  const generatedOtp = generateSecureOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes secure lifetime

  whatsappOtpStore.set(cleanPhone, { otp: generatedOtp, expiresAt });

  try {
    const dispatchResult = await dispatchWhatsAppOtp(cleanPhone, generatedOtp);
    return res.status(200).json({
      success: true,
      phone: cleanPhone,
      message: `WhatsApp OTP verification code sent to +${cleanPhone}.`
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Could not send WhatsApp OTP: " + err.message
    });
  }
}

/**
 * Verify WhatsApp OTP and sign in / register user
 */
export async function verifyWhatsAppOtpController(req, res) {
  const { phone, otp, fullName } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: "Phone number and OTP code are required" });
  }

  const cleanPhone = phone.toString().replace(/\D/g, '');
  const attemptCheck = recordOtpAttempt(`wa_${cleanPhone}`);
  if (attemptCheck.locked) {
    return res.status(429).json({
      success: false,
      message: `Too many invalid attempts. Try again in ${attemptCheck.remainingSec}s.`
    });
  }

  const record = whatsappOtpStore.get(cleanPhone);
  if (!record) {
    return res.status(400).json({ success: false, message: "No OTP requested for this phone number or it has expired" });
  }

  if (Date.now() > record.expiresAt) {
    whatsappOtpStore.delete(cleanPhone);
    return res.status(400).json({ success: false, message: "OTP code has expired. Please request a new one." });
  }

  if (record.otp !== otp.toString().trim()) {
    if (attemptCheck.attemptsRemaining <= 0) {
      whatsappOtpStore.delete(cleanPhone);
      return res.status(429).json({
        success: false,
        message: "Maximum OTP attempts exceeded. Code has been invalidated."
      });
    }
    return res.status(400).json({ 
      success: false, 
      message: `Invalid OTP code. (${attemptCheck.attemptsRemaining} attempts left)` 
    });
  }

  // Valid OTP - consume it & reset attempt counter
  whatsappOtpStore.delete(cleanPhone);
  resetOtpAttempts(`wa_${cleanPhone}`);

  // Authenticate / Find or create user
  const userFullName = fullName?.trim() || `Traveler (+${cleanPhone.slice(-4)})`;
  const userEmail = `whatsapp_${cleanPhone}@safar.travel`;

  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE phone = ? OR email = ? LIMIT 1', [cleanPhone, userEmail]);
    
    let userRecord;
    if (existing && existing.length > 0) {
      userRecord = existing[0];
      await pool.query('UPDATE users SET is_verified = 1, last_login = CURRENT_TIMESTAMP WHERE id = ?', [userRecord.id]);
    } else {
      const [insertResult] = await pool.query(
        'INSERT INTO users (fullName, email, phone, role, auth_provider, is_verified) VALUES (?, ?, ?, "Customer", "whatsapp", 1)',
        [userFullName, userEmail, cleanPhone]
      );
      userRecord = {
        id: insertResult.insertId,
        fullName: userFullName,
        email: userEmail,
        phone: cleanPhone,
        role: "Customer"
      };
    }

    const token = signJwt({
      id: userRecord.id,
      email: userRecord.email,
      phone: userRecord.phone,
      role: userRecord.role || 'Customer'
    });

    return res.status(200).json({
      success: true,
      message: "WhatsApp OTP verified successfully!",
      token,
      user: {
        id: userRecord.id,
        fullName: userRecord.fullName,
        email: userRecord.email,
        phone: userRecord.phone,
        role: userRecord.role || "Customer"
      }
    });
  } catch (dbErr) {
    console.warn("[WhatsApp Auth DB Warning]:", dbErr.message);
    const userFallback = {
      id: Date.now(),
      fullName: userFullName,
      email: userEmail,
      phone: cleanPhone,
      role: "Customer"
    };
    const token = signJwt(userFallback);

    return res.status(200).json({
      success: true,
      message: "WhatsApp OTP verified successfully!",
      token,
      user: userFallback
    });
  }
}

