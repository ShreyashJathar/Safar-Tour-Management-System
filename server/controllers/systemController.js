import { checkDatabaseHealth, pool } from '../config/db.js';
import { seedInitialData } from '../seeds/seedData.js';

/**
 * Health and Database connectivity status check
 */
export async function getSystemHealth(req, res) {
  const dbHealth = await checkDatabaseHealth();
  res.status(200).json({
    success: true,
    server: "Safar Express Engine v2.0",
    uptime: Math.round(process.uptime()),
    database: dbHealth,
    timestamp: new Date().toISOString()
  });
}

/**
 * Trigger database re-seed (Admin action)
 */
export async function reseedDatabase(req, res) {
  try {
    const success = await seedInitialData();
    const dbHealth = await checkDatabaseHealth();
    res.status(200).json({
      success,
      message: "Database tables synced and seeded successfully",
      database: dbHealth
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Customer Contact Inquiry Form Submission
 */
export async function submitContactInquiry(req, res) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }

    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email.toLowerCase(), subject || "General Inquiry", message]
    );

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received and stored in our database.",
      inquiryId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
