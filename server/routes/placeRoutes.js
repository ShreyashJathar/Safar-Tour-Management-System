import express from 'express';
import { getAllPlaces, getPlaceById, addPlaceReview } from '../controllers/placeController.js';

const router = express.Router();

router.get('/', getAllPlaces);
router.get('/:id', getPlaceById);
router.post('/:id/reviews', addPlaceReview);

export default router;
