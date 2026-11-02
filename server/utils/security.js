import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'safar_luxury_travel_jwt_secret_key_2026_super_secure';

/**
 * Sign a cryptographic JWT (HS256)
 */
export function signJwt(payload, expiresInSeconds = 7 * 24 * 3600) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

/**
 * Verify a cryptographic JWT (HS256)
 */
export function verifyJwt(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;

  try {
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Generate cryptographically secure 6-digit OTP
 */
export function generateSecureOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Password strength validator: Min 8 chars, at least 1 number and 1 letter
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Za-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true };
}

// In-Memory sliding-window rate limit store
const ipTracker = new Map();

/**
 * Express Rate Limiting Middleware
 */
export function createRateLimiter({ windowMs = 15 * 60 * 1000, max = 5, message = 'Too many attempts. Please try again later.' }) {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown-client';
    const key = `${req.baseUrl || ''}${req.path}:${ip}`;
    const now = Date.now();

    const record = ipTracker.get(key) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
      if (record.count > max) {
        const retrySec = Math.ceil((record.resetTime - now) / 1000);
        res.setHeader('Retry-After', retrySec);
        return res.status(429).json({
          success: false,
          message: `${message} (Retry after ${retrySec} seconds)`
        });
      }
    }

    ipTracker.set(key, record);
    next();
  };
}

/**
 * OTP Attempt Tracker & Lockout
 */
const otpAttemptStore = new Map();

export function recordOtpAttempt(identifier) {
  const key = identifier.toLowerCase();
  const current = otpAttemptStore.get(key) || { attempts: 0, lockedUntil: 0 };
  
  if (Date.now() < current.lockedUntil) {
    return { locked: true, remainingSec: Math.ceil((current.lockedUntil - Date.now()) / 1000) };
  }

  current.attempts += 1;
  if (current.attempts >= 5) {
    current.lockedUntil = Date.now() + 10 * 60 * 1000; // 10 minutes lock
    otpAttemptStore.set(key, current);
    return { locked: true, remainingSec: 600 };
  }

  otpAttemptStore.set(key, current);
  return { locked: false, attemptsRemaining: 5 - current.attempts };
}

export function resetOtpAttempts(identifier) {
  otpAttemptStore.delete(identifier.toLowerCase());
}

/**
 * Authentication Middleware
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const user = verifyJwt(token);
  if (!user) {
    return res.status(403).json({ success: false, message: 'Invalid or expired authentication token' });
  }

  req.user = user;
  next();
}

/**
 * Admin authorization middleware
 */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({ success: false, message: 'Admin access privileges required' });
  }
  next();
}
