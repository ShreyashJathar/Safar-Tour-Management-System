import express from 'express';
import { getAllFlights } from '../controllers/flightController.js';

const router = express.Router();

router.get('/', getAllFlights);

export default router;
