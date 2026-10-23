import express from 'express';
import { getUserWishlist, toggleWishlistItem } from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/:email', getUserWishlist);
router.post('/toggle', toggleWishlistItem);

export default router;
