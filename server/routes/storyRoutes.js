import express from 'express';
import { getAllStories, createStory, likeStory } from '../controllers/storyController.js';

const router = express.Router();

router.get('/', getAllStories);
router.post('/', createStory);
router.post('/:id/like', likeStory);

export default router;
