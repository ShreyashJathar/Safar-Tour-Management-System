import { pool } from '../config/db.js';

export async function getUserWishlist(req, res) {
  try {
    const { email } = req.params;
    const [rows] = await pool.query(
      'SELECT item_id, item_type FROM wishlists WHERE user_email = ?',
      [email.toLowerCase()]
    );
    const itemIds = rows.map(r => r.item_id);
    res.status(200).json({ success: true, wishlist: itemIds, items: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function toggleWishlistItem(req, res) {
  try {
    const { email, itemId, itemType = 'tour' } = req.body;
    if (!email || !itemId) {
      return res.status(400).json({ success: false, message: "Email and itemId are required" });
    }

    const userEmail = email.toLowerCase();
    const [existing] = await pool.query(
      'SELECT id FROM wishlists WHERE user_email = ? AND item_id = ? AND item_type = ?',
      [userEmail, itemId, itemType]
    );

    let isSaved = false;
    if (existing.length > 0) {
      await pool.query('DELETE FROM wishlists WHERE id = ?', [existing[0].id]);
      isSaved = false;
    } else {
      await pool.query(
        'INSERT INTO wishlists (user_email, item_id, item_type) VALUES (?, ?, ?)',
        [userEmail, itemId, itemType]
      );
      isSaved = true;
    }

    const [allWishlist] = await pool.query('SELECT item_id FROM wishlists WHERE user_email = ?', [userEmail]);
    const updatedIds = allWishlist.map(r => r.item_id);

    res.status(200).json({
      success: true,
      isSaved,
      wishlist: updatedIds,
      message: isSaved ? "Added to wishlist" : "Removed from wishlist"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
