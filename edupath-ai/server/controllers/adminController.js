import Course from '../models/Course.js';
import Recommendation from '../models/Recommendation.js';
import StudentProfile from '../models/StudentProfile.js';
import User from '../models/User.js';

export const getStats = async (req, res) => {
  const [totalCourses, totalStudents, totalUsers, categories, recentCourses] = await Promise.all([
    Course.countDocuments(),
    User.countDocuments({ role: 'student' }),
    User.countDocuments(),
    Course.distinct('category'),
    Course.find().sort({ createdAt: -1 }).limit(6)
  ]);
  const popularCategories = await Course.aggregate([{ $group: { _id: '$category', count: { $sum: 1 }, avgRating: { $avg: '$rating' } } }, { $sort: { count: -1 } }, { $limit: 8 }]);
  res.json({ totalCourses, totalStudents, totalUsers, totalCategories: categories.length, popularCategories, recentCourses });
};

export const getUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

export const getCoursesSummary = async (req, res) => {
  const byCategory = await Course.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
  const difficultyDistribution = await Course.aggregate([{ $group: { _id: '$difficulty', count: { $sum: 1 } } }]);
  const topRecommended = await Recommendation.aggregate([{ $group: { _id: '$courseId', count: { $sum: 1 }, avgScore: { $avg: '$score' } } }, { $sort: { count: -1, avgScore: -1 } }, { $limit: 8 }, { $lookup: { from: 'courses', localField: '_id', foreignField: '_id', as: 'course' } }, { $unwind: '$course' }]);
  const studentsByInterest = await StudentProfile.aggregate([{ $unwind: '$interests' }, { $group: { _id: '$interests', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 12 }]);
  res.json({ byCategory, difficultyDistribution, topRecommended, studentsByInterest });
};
