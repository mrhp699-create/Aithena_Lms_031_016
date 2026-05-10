import express from 'express';
import { getCoursesSummary, getStats, getUsers } from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(protect, adminOnly);
router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/courses-summary', getCoursesSummary);
export default router;
