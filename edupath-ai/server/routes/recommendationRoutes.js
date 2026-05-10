import express from 'express';
import { generateMyRecommendations, getLearningPath, getMyRecommendations, getSkillGap } from '../controllers/recommendationController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/me', protect, getMyRecommendations);
router.post('/generate', protect, generateMyRecommendations);
router.get('/learning-path', protect, getLearningPath);
router.get('/skill-gap', protect, getSkillGap);
export default router;
