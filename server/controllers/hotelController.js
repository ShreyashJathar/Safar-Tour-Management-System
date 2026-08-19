import { pool } from '../config/db.js';

const formatHotelRow = (row) => {
  if (!row) return null;
  return {
    ...row,
    price: Number(row.price),
    rating: Number(row.rating),
    featured: Boolean(row.featured),
    amenities: typeof row.amenities === 'string' ? JSON.parse(row.amenities) : (row.amenities || []),
    roomTypes: typeof row.roomTypes === 'string' ? JSON.parse(row.roomTypes) : (row.roomTypes || []),
    reviews: typeof row.reviews === 'string' ? JSON.parse(row.reviews) : (row.reviews || [])
  };
};

/**
 * Get all hotels from MySQL
 */
export async function getAllHotels(req, res) {
  try {
    const { category, search, maxPrice } = req.query;
    let query = 'SELECT * FROM hotels WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (name LIKE ? OR location LIKE ? OR description LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }
    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(Number(maxPrice));
    }

    query += ' ORDER BY featured DESC, id DESC';

    const [rows] = await pool.query(query, params);
    const formatted = rows.map(formatHotelRow);

    res.status(200).json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error("[Hotels Controller] Error fetching hotels:", error);
    res.status(500).json({ success: false, message: "Failed to fetch hotels" });
  }
}

/**
 * Get single hotel by ID
 */
export async function getHotelById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM hotels WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }
    res.status(200).json({ success: true, data: formatHotelRow(rows[0]) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Create a new hotel (Admin)
 */
export async function createHotel(req, res) {
  try {
    const { name, location, price, image, category = "Luxury", description, amenities = [], roomTypes = [] } = req.body;

    if (!name || !location || !price || !image || !description) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const [result] = await pool.query(
      `INSERT INTO hotels (name, location, price, rating, reviewsCount, image, category, description, amenities, roomTypes, reviews, featured)
       VALUES (?, ?, ?, 5.0, 0, ?, ?, ?, ?, ?, '[]', 0)`,
      [
        name,
        location,
        Number(price),
        image,
        category,
        description,
        JSON.stringify(amenities),
        JSON.stringify(roomTypes)
      ]
    );

    const [newRow] = await pool.query('SELECT * FROM hotels WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: "Hotel created successfully in database",
      data: formatHotelRow(newRow[0])
    });
  } catch (error) {
    console.error("[Hotels Controller] Create error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Update an existing hotel (Admin)
 */
export async function updateHotel(req, res) {
  try {
    const { id } = req.params;
    const { name, location, price, rating, reviewsCount, image, category, description, amenities, roomTypes, featured } = req.body;

    await pool.query(
      `UPDATE hotels SET 
        name = COALESCE(?, name),
        location = COALESCE(?, location),
        price = COALESCE(?, price),
        rating = COALESCE(?, rating),
        reviewsCount = COALESCE(?, reviewsCount),
        image = COALESCE(?, image),
        category = COALESCE(?, category),
        description = COALESCE(?, description),
        amenities = COALESCE(?, amenities),
        roomTypes = COALESCE(?, roomTypes),
        featured = COALESCE(?, featured)
       WHERE id = ?`,
      [
        name,
        location,
        price !== undefined ? Number(price) : null,
        rating !== undefined ? Number(rating) : null,
        reviewsCount !== undefined ? Number(reviewsCount) : null,
        image,
        category,
        description,
        amenities ? JSON.stringify(amenities) : null,
        roomTypes ? JSON.stringify(roomTypes) : null,
        featured !== undefined ? (featured ? 1 : 0) : null,
        id
      ]
    );

    const [updated] = await pool.query('SELECT * FROM hotels WHERE id = ?', [id]);
    if (updated.length === 0) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: formatHotelRow(updated[0])
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Delete a hotel (Admin)
 */
export async function deleteHotel(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM hotels WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }
    res.status(200).json({ success: true, message: `Hotel ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Add review to hotel
 */
export async function addHotelReview(req, res) {
  try {
    const { id } = req.params;
    const { author, rating, comment, date } = req.body;

    const [rows] = await pool.query('SELECT reviews, rating, reviewsCount FROM hotels WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    const currentReviews = typeof rows[0].reviews === 'string' ? JSON.parse(rows[0].reviews) : (rows[0].reviews || []);
    const newReview = {
      author: author || "Verified Guest",
      rating: Number(rating) || 5,
      comment: comment || "",
      date: date || new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [newReview, ...currentReviews];
    const newCount = updatedReviews.length;
    const newAvg = (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / newCount).toFixed(2);

    await pool.query(
      'UPDATE hotels SET reviews = ?, rating = ?, reviewsCount = ? WHERE id = ?',
      [JSON.stringify(updatedReviews), newAvg, newCount, id]
    );

    res.status(200).json({
      success: true,
      message: "Hotel review added successfully",
      reviews: updatedReviews,
      rating: Number(newAvg),
      reviewsCount: newCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
