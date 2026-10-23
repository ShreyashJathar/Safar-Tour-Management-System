import express from 'express';
import { getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel, addHotelReview } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.post('/', createHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);
router.post('/:id/reviews', addHotelReview);

export default router;
