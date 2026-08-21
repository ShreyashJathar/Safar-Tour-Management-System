import express from 'express';
import { getAllBookings, getUserBookings, createBooking, updateBookingStatus, cancelBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', getAllBookings);
router.get('/user/:email', getUserBookings);
router.post('/', createBooking);
router.patch('/:bookingId/status', updateBookingStatus);
router.delete('/:bookingId', cancelBooking);

export default router;
