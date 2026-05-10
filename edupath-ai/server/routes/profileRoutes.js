import express from 'express';
import { getMyProfile, toggleSavedCourse, updateProfile, upsertProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', protect, upsertProfile);
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateProfile);
router.post('/saved/:courseId', protect, toggleSavedCourse);
export default router;
