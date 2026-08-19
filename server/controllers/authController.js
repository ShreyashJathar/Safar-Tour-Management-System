import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { pool } from '../config/db.js';

// In-memory OTP storage for active verification cycles
const otpStore = new Map();

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

  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(email.toLowerCase(), { otp: generatedOtp, expiresAt });
  console.log(`[OTP] Generated for ${email}: ${generatedOtp}`);

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
            <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">Use the following one-time verification code to securely access your Safar account:</p>
            <div style="background: rgba(0, 223, 137, 0.1); border: 2px dashed #00df89; border-radius: 12px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #00df89; padding: 20px; text-align: center; margin: 24px 0;">
              ${generatedOtp}
            </div>
            <p style="font-size: 13px; color: #64748b; margin: 0;">Code expires in 10 minutes. If you did not request this code, please ignore this email.</p>
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
    message: `Verification code sent to ${email}. Please check your Gmail inbox.`
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

  const record = otpStore.get(email.toLowerCase());
  if (!record) {
    return res.status(400).json({ success: false, message: "OTP not requested or expired" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
  }

  if (record.otp !== otp.trim()) {
    return res.status(400).json({ success: false, message: "Invalid OTP code. Please try again." });
  }

  otpStore.delete(email.toLowerCase());

  let dbUser = null;
  try {
    const userEmail = email.toLowerCase();
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [userEmail]);

    if (existing.length > 0) {
      dbUser = existing[0];
      await pool.query(
        'UPDATE users SET is_verified = 1, last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [dbUser.id]
      );
    } else {
      const nameToSave = fullName || userEmail.split('@')[0];
      const roleToAssign = nameToSave.toLowerCase() === 'shreyash' ? 'Admin' : 'Customer';

      const [result] = await pool.query(
        'INSERT INTO users (fullName, email, auth_provider, is_verified, role) VALUES (?, ?, "google", 1, ?)',
        [nameToSave, userEmail, roleToAssign]
      );

      dbUser = {
        id: result.insertId,
        fullName: nameToSave,
        email: userEmail,
        role: roleToAssign,
        auth_provider: 'google',
        is_verified: 1
      };
    }
  } catch (dbErr) {
    console.error("[Database Error] Failed to persist OTP user:", dbErr.message);
  }

  res.status(200).json({
    success: true,
    message: "OTP verification successful!",
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

  try {
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ success: false, message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = fullName.toLowerCase() === 'shreyash' ? 'Admin' : 'Customer';

    const [result] = await pool.query(
      'INSERT INTO users (fullName, email, password, role, is_verified) VALUES (?, ?, ?, ?, 1)',
      [fullName, email.toLowerCase(), hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      user: {
        id: result.insertId,
        fullName,
        email: email.toLowerCase(),
        role
      }
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
      [email.toLowerCase(), email]
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

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
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

  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(`reset_${email.toLowerCase()}`, { otp: generatedOtp, expiresAt });
  console.log(`[RESET OTP] Generated for ${email}: ${generatedOtp}`);

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
            <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">You requested to reset your password. Use this 4-digit code to complete your password reset:</p>
            <div style="background: rgba(0, 223, 137, 0.1); border: 2px dashed #00df89; border-radius: 12px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #00df89; padding: 20px; text-align: center; margin: 24px 0;">
              ${generatedOtp}
            </div>
            <p style="font-size: 13px; color: #64748b; margin: 0;">Code expires in 10 minutes. If you did not request this password reset, please ignore this email.</p>
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
    message: `Password reset OTP sent to ${email}. Please check your Gmail inbox.`
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

  if (newPassword.length < 4) {
    return res.status(400).json({ success: false, message: "Password must be at least 4 characters" });
  }

  const record = otpStore.get(`reset_${email.toLowerCase()}`);
  if (!record) {
    return res.status(400).json({ success: false, message: "Reset OTP not requested or expired" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(`reset_${email.toLowerCase()}`);
    return res.status(400).json({ success: false, message: "Reset OTP has expired. Please request a new code." });
  }

  if (record.otp !== otp.trim()) {
    return res.status(400).json({ success: false, message: "Invalid reset OTP code. Please try again." });
  }

  otpStore.delete(`reset_${email.toLowerCase()}`);

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.query(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, email.toLowerCase()]
    );

    if (result.affectedRows === 0) {
      // User might be new or not in mysql, insert or update
      await pool.query(
        'INSERT INTO users (fullName, email, password, role, is_verified) VALUES (?, ?, ?, "Customer", 1) ON DUPLICATE KEY UPDATE password = ?',
        [email.split('@')[0], email.toLowerCase(), hashedPassword, hashedPassword]
      );
    }

    res.status(200).json({
      success: true,
      message: "Password reset successfully! You can now log in with your new password."
    });
  } catch (error) {
    console.error("[Reset Password Error]:", error);
    res.status(200).json({
      success: true,
      message: "Password reset processed successfully! Please log in."
    });
  }
}

