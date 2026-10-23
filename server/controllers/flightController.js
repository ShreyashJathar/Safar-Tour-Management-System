import { pool } from '../config/db.js';

const formatFlightRow = (row) => {
  if (!row) return null;
  return {
    ...row,
    price: Number(row.price),
    cabinClasses: typeof row.cabinClasses === 'string' ? JSON.parse(row.cabinClasses) : (row.cabinClasses || [])
  };
};

export async function getAllFlights(req, res) {
  try {
    const { origin, destination } = req.query;
    let query = 'SELECT * FROM flights WHERE 1=1';
    const params = [];

    if (origin) {
      query += ' AND (origin = ? OR originCity LIKE ?)';
      params.push(origin, `%${origin}%`);
    }
    if (destination) {
      query += ' AND (destination = ? OR destinationCity LIKE ?)';
      params.push(destination, `%${destination}%`);
    }

    query += ' ORDER BY price ASC';

    const [rows] = await pool.query(query, params);
    res.status(200).json({ success: true, count: rows.length, data: rows.map(formatFlightRow) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
