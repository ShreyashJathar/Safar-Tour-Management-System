import { pool } from '../config/db.js';

/**
 * Helper to parse JSON fields safely
 */
const formatTourRow = (row) => {
  if (!row) return null;
  return {
    ...row,
    price: Number(row.price),
    rating: Number(row.rating),
    featured: Boolean(row.featured),
    highlights: typeof row.highlights === 'string' ? JSON.parse(row.highlights) : (row.highlights || []),
    itinerary: typeof row.itinerary === 'string' ? JSON.parse(row.itinerary) : (row.itinerary || []),
    reviews: typeof row.reviews === 'string' ? JSON.parse(row.reviews) : (row.reviews || [])
  };
};

/**
 * Get all tours from MySQL
 */
export async function getAllTours(req, res) {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let query = 'SELECT * FROM tours WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (title LIKE ? OR location LIKE ? OR description LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }
    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(Number(maxPrice));
    }

    query += ' ORDER BY featured DESC, id DESC';

    const [rows] = await pool.query(query, params);
    const formatted = rows.map(formatTourRow);

    res.status(200).json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error("[Tours Controller] Error fetching tours:", error);
    res.status(500).json({ success: false, message: "Failed to fetch tours from database" });
  }
}

/**
 * Get single tour by ID
 */
export async function getTourById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM tours WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }
    res.status(200).json({ success: true, data: formatTourRow(rows[0]) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Create a new tour (Admin)
 */
export async function createTour(req, res) {
  try {
    const { title, location, duration = 3, price, image, category = "Nature", description, highlights = [], itinerary = [] } = req.body;

    if (!title || !location || !price || !image || !description) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const [result] = await pool.query(
      `INSERT INTO tours (title, location, duration, price, rating, reviewsCount, image, category, description, highlights, itinerary, reviews, featured)
       VALUES (?, ?, ?, ?, 5.0, 0, ?, ?, ?, ?, ?, '[]', 0)`,
      [
        title,
        location,
        Number(duration),
        Number(price),
        image,
        category,
        description,
        JSON.stringify(highlights),
        JSON.stringify(itinerary)
      ]
    );

    const [newRow] = await pool.query('SELECT * FROM tours WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: "Tour created successfully in database",
      data: formatTourRow(newRow[0])
    });
  } catch (error) {
    console.error("[Tours Controller] Create error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Update an existing tour (Admin)
 */
export async function updateTour(req, res) {
  try {
    const { id } = req.params;
    const { title, location, duration, price, rating, reviewsCount, image, category, description, highlights, itinerary, featured } = req.body;

    await pool.query(
      `UPDATE tours SET 
        title = COALESCE(?, title),
        location = COALESCE(?, location),
        duration = COALESCE(?, duration),
        price = COALESCE(?, price),
        rating = COALESCE(?, rating),
        reviewsCount = COALESCE(?, reviewsCount),
        image = COALESCE(?, image),
        category = COALESCE(?, category),
        description = COALESCE(?, description),
        highlights = COALESCE(?, highlights),
        itinerary = COALESCE(?, itinerary),
        featured = COALESCE(?, featured)
       WHERE id = ?`,
      [
        title,
        location,
        duration !== undefined ? Number(duration) : null,
        price !== undefined ? Number(price) : null,
        rating !== undefined ? Number(rating) : null,
        reviewsCount !== undefined ? Number(reviewsCount) : null,
        image,
        category,
        description,
        highlights ? JSON.stringify(highlights) : null,
        itinerary ? JSON.stringify(itinerary) : null,
        featured !== undefined ? (featured ? 1 : 0) : null,
        id
      ]
    );

    const [updated] = await pool.query('SELECT * FROM tours WHERE id = ?', [id]);
    if (updated.length === 0) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: formatTourRow(updated[0])
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Delete a tour (Admin)
 */
export async function deleteTour(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM tours WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }
    res.status(200).json({ success: true, message: `Tour ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Add review to tour
 */
export async function addTourReview(req, res) {
  try {
    const { id } = req.params;
    const { author, rating, comment, date } = req.body;

    const [rows] = await pool.query('SELECT reviews, rating, reviewsCount FROM tours WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    const currentReviews = typeof rows[0].reviews === 'string' ? JSON.parse(rows[0].reviews) : (rows[0].reviews || []);
    const newReview = {
      author: author || "Verified Traveler",
      rating: Number(rating) || 5,
      comment: comment || "",
      date: date || new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [newReview, ...currentReviews];
    const newCount = updatedReviews.length;
    const newAvg = (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / newCount).toFixed(2);

    await pool.query(
      'UPDATE tours SET reviews = ?, rating = ?, reviewsCount = ? WHERE id = ?',
      [JSON.stringify(updatedReviews), newAvg, newCount, id]
    );

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      reviews: updatedReviews,
      rating: Number(newAvg),
      reviewsCount: newCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
