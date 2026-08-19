import { pool } from '../config/db.js';

const formatPlaceRow = (row) => {
  if (!row) return null;
  return {
    ...row,
    ticketPrice: Number(row.ticketPrice),
    rating: Number(row.rating),
    galleryImages: typeof row.galleryImages === 'string' ? JSON.parse(row.galleryImages) : (row.galleryImages || []),
    highlights: typeof row.highlights === 'string' ? JSON.parse(row.highlights) : (row.highlights || []),
    ticketTypes: typeof row.ticketTypes === 'string' ? JSON.parse(row.ticketTypes) : (row.ticketTypes || []),
    reviews: typeof row.reviews === 'string' ? JSON.parse(row.reviews) : (row.reviews || [])
  };
};

export async function getAllPlaces(req, res) {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM places WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (name LIKE ? OR city LIKE ? OR country LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY id ASC';

    const [rows] = await pool.query(query, params);
    res.status(200).json({ success: true, count: rows.length, data: rows.map(formatPlaceRow) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getPlaceById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM places WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Place not found" });
    }
    res.status(200).json({ success: true, data: formatPlaceRow(rows[0]) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function addPlaceReview(req, res) {
  try {
    const { id } = req.params;
    const { author, rating, comment, date } = req.body;

    const [rows] = await pool.query('SELECT reviews, rating, reviewsCount FROM places WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Place not found" });
    }

    const currentReviews = typeof rows[0].reviews === 'string' ? JSON.parse(rows[0].reviews) : (rows[0].reviews || []);
    const newReview = {
      author: author || "Explorer",
      rating: Number(rating) || 5,
      comment: comment || "",
      date: date || new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [newReview, ...currentReviews];
    const newCount = updatedReviews.length;
    const newAvg = (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / newCount).toFixed(2);

    await pool.query(
      'UPDATE places SET reviews = ?, rating = ?, reviewsCount = ? WHERE id = ?',
      [JSON.stringify(updatedReviews), newAvg, newCount, id]
    );

    res.status(200).json({
      success: true,
      message: "Place review added successfully",
      reviews: updatedReviews,
      rating: Number(newAvg),
      reviewsCount: newCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
