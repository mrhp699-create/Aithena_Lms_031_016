import Course from '../models/Course.js';
import Recommendation from '../models/Recommendation.js';
import StudentProfile from '../models/StudentProfile.js';
import { buildSkillGap, generateRecommendations } from '../recommender/recommendationEngine.js';

const requireProfile = async userId => {
  const profile = await StudentProfile.findOne({ userId });
  if (!profile) {
    const error = new Error('Create your student profile before generating recommendations');
    error.statusCode = 404;
    throw error;
  }
  return profile;
};

export const generateMyRecommendations = async (req, res) => {
  const profile = await requireProfile(req.user._id);
  const courses = await Course.find();
  const ranked = generateRecommendations(profile, courses).slice(0, 12);
  await Recommendation.deleteMany({ userId: req.user._id });
  const docs = await Recommendation.insertMany(ranked.map(item => ({
    userId: req.user._id,
    courseId: item.course._id,
    score: item.score,
    reasons: item.reasons,
    matchedSkills: item.matchedSkills,
    matchedInterests: item.matchedInterests,
    suggestedNextCourse: item.suggestedNextCourse,
    learningPathPosition: item.learningPathPosition
  })));
  const saved = await Recommendation.find({ _id: { $in: docs.map(doc => doc._id) } }).populate('courseId').sort({ score: -1 });
  res.status(201).json(saved);
};

export const getMyRecommendations = async (req, res) => {
  let recommendations = await Recommendation.find({ userId: req.user._id }).populate('courseId').sort({ score: -1 });
  if (!recommendations.length) {
    const profile = await StudentProfile.findOne({ userId: req.user._id });
    if (profile) {
      const courses = await Course.find();
      recommendations = generateRecommendations(profile, courses).slice(0, 12).map(item => ({
        courseId: item.course,
        score: item.score,
        reasons: item.reasons,
        matchedSkills: item.matchedSkills,
        matchedInterests: item.matchedInterests,
        suggestedNextCourse: item.suggestedNextCourse,
        learningPathPosition: item.learningPathPosition
      }));
    }
  }
  res.json(recommendations);
};

export const getLearningPath = async (req, res) => {
  const profile = await requireProfile(req.user._id);
  const courses = await Course.find();
  const path = generateRecommendations(profile, courses).slice(0, 6).map((item, index) => ({
    step: index + 1,
    course: item.course,
    matchPercentage: item.score,
    focus: item.reasons[0],
    nextStepSuggestion: item.nextStepSuggestion
  }));
  res.json({ careerGoal: profile.careerGoal, weeklyStudyTime: profile.weeklyStudyTime, path });
};

export const getSkillGap = async (req, res) => {
  const profile = await requireProfile(req.user._id);
  const courses = await Course.find();
  res.json(buildSkillGap(profile, courses));
};
