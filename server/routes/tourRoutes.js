import express from 'express';
import { getAllTours, getTourById, createTour, updateTour, deleteTour, addTourReview } from '../controllers/tourController.js';

const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getTourById);
router.post('/', createTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);
router.post('/:id/reviews', addTourReview);

export default router;
