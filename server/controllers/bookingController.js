import { pool } from '../config/db.js';

const formatBookingRow = (row) => {
  if (!row) return null;
  return {
    ...row,
    calculatedPrice: Number(row.calculated_price),
    promoDiscount: Number(row.promo_discount),
    finalCost: Number(row.final_cost),
    primaryContact: typeof row.primaryContact === 'string' ? JSON.parse(row.primaryContact) : (row.primaryContact || {}),
    otherTravelers: typeof row.otherTravelers === 'string' ? JSON.parse(row.otherTravelers) : (row.otherTravelers || []),
    addons: typeof row.addons === 'string' ? JSON.parse(row.addons) : (row.addons || {})
  };
};

/**
 * Get all bookings (Admin)
 */
export async function getAllBookings(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.status(200).json({ success: true, count: rows.length, data: rows.map(formatBookingRow) });
  } catch (error) {
    console.error("[Booking Controller] Error fetching all bookings:", error);
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
}

/**
 * Get bookings for a specific user
 */
export async function getUserBookings(req, res) {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ success: false, message: "User email is required" });
    }

    const [rows] = await pool.query(
      'SELECT * FROM bookings WHERE user_email = ? ORDER BY created_at DESC',
      [email.toLowerCase()]
    );

    res.status(200).json({ success: true, count: rows.length, data: rows.map(formatBookingRow) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Create a new booking
 */
export async function createBooking(req, res) {
  try {
    const booking = req.body;
    const generatedBookingId = booking.bookingId || `SFR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const userEmail = (booking.primaryContact?.email || booking.user_email || "guest@safar.com").toLowerCase();
    const userName = booking.primaryContact?.name || booking.user_name || "Valued Traveler";
    const userPhone = booking.primaryContact?.phone || booking.user_phone || "";

    const bookingType = booking.type || booking.bookingType || "tour";
    const itemId = booking.tour?.id || booking.hotel?.id || booking.place?.id || booking.flight?.id || booking.item_id || 1;
    const itemTitle = booking.tour?.title || booking.hotel?.name || booking.place?.name || booking.flight?.airline || booking.item_title || "Reservation";
    const itemLocation = booking.tour?.location || booking.hotel?.location || booking.place?.city || booking.item_location || "";
    const itemImage = booking.tour?.image || booking.hotel?.image || booking.place?.image || booking.item_image || "";

    const startDate = booking.date || booking.checkIn || booking.start_date || new Date().toISOString().split('T')[0];
    const endDate = booking.checkOut || booking.end_date || "";
    const nights = Number(booking.nights) || 1;
    const adults = Number(booking.adults) || 1;
    const children = Number(booking.children) || 0;
    const totalTravelers = adults + children;

    const calculatedPrice = Number(booking.calculatedPrice || booking.initialCost || booking.finalCost || 0);
    const promoDiscount = Number(booking.promoDiscount || 0);
    const finalCost = Number(booking.finalCost || calculatedPrice - promoDiscount);

    const [result] = await pool.query(
      `INSERT INTO bookings (
        bookingId, user_email, user_name, user_phone, booking_type, 
        item_id, item_title, item_location, item_image, start_date, end_date, 
        nights, adults, children, total_travelers, primaryContact, otherTravelers, 
        addons, calculated_price, promo_discount, final_cost, payment_method, 
        payment_id, order_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')`,
      [
        generatedBookingId,
        userEmail,
        userName,
        userPhone,
        bookingType,
        itemId,
        itemTitle,
        itemLocation,
        itemImage,
        startDate,
        endDate,
        nights,
        adults,
        children,
        totalTravelers,
        JSON.stringify(booking.primaryContact || { name: userName, email: userEmail, phone: userPhone }),
        JSON.stringify(booking.otherTravelers || []),
        JSON.stringify(booking.tourAddons || booking.hotelAddons || booking.addons || {}),
        calculatedPrice,
        promoDiscount,
        finalCost,
        booking.paymentMethod || 'Card',
        booking.paymentId || null,
        booking.orderId || null
      ]
    );

    const [newBookingRow] = await pool.query('SELECT * FROM bookings WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: "Booking confirmed and recorded in database",
      data: formatBookingRow(newBookingRow[0])
    });
  } catch (error) {
    console.error("[Booking Controller] Create booking error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Update booking status (e.g., 'Confirmed', 'Cancelled', 'Completed')
 */
export async function updateBookingStatus(req, res) {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const [result] = await pool.query(
      'UPDATE bookings SET status = ? WHERE bookingId = ?',
      [status, bookingId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const [updated] = await pool.query('SELECT * FROM bookings WHERE bookingId = ?', [bookingId]);
    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: formatBookingRow(updated[0])
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Cancel a booking
 */
export async function cancelBooking(req, res) {
  try {
    const { bookingId } = req.params;
    const [result] = await pool.query(
      'UPDATE bookings SET status = "Cancelled" WHERE bookingId = ?',
      [bookingId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
