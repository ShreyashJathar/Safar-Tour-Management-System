import { pool } from '../config/db.js';

export async function getAllStories(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM stories ORDER BY id ASC');
    res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function createStory(req, res) {
  try {
    const { author, location, image, quote, avatar = "🎒", rating = 5 } = req.body;
    if (!author || !location || !image || !quote) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const [result] = await pool.query(
      'INSERT INTO stories (author, location, image, quote, avatar, rating, likes) VALUES (?, ?, ?, ?, ?, ?, 0)',
      [author, location, image, quote, avatar, Number(rating)]
    );

    const [newStory] = await pool.query('SELECT * FROM stories WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: "Story shared successfully!", data: newStory[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function likeStory(req, res) {
  try {
    const { id } = req.params;
    await pool.query('UPDATE stories SET likes = likes + 1 WHERE id = ?', [id]);
    const [updated] = await pool.query('SELECT * FROM stories WHERE id = ?', [id]);
    res.status(200).json({ success: true, likes: updated[0].likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
