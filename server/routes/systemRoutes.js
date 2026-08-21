import express from 'express';
import { getSystemHealth, reseedDatabase, submitContactInquiry } from '../controllers/systemController.js';

const router = express.Router();

router.get('/health', getSystemHealth);
router.get('/status', getSystemHealth);
router.post('/reseed', reseedDatabase);
router.post('/contact', submitContactInquiry);

export default router;
