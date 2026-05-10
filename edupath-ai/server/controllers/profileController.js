import StudentProfile from '../models/StudentProfile.js';

export const upsertProfile = async (req, res) => {
  const profile = await StudentProfile.findOneAndUpdate(
    { userId: req.user._id },
    { ...req.body, userId: req.user._id },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).populate('savedCourses completedCourses');
  res.status(201).json(profile);
};

export const getMyProfile = async (req, res) => {
  const profile = await StudentProfile.findOne({ userId: req.user._id }).populate('savedCourses completedCourses');
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  res.json(profile);
};

export const updateProfile = upsertProfile;

export const toggleSavedCourse = async (req, res) => {
  const profile = await StudentProfile.findOne({ userId: req.user._id });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  const courseId = req.params.courseId;
  const exists = profile.savedCourses.some(id => id.toString() === courseId);
  profile.savedCourses = exists ? profile.savedCourses.filter(id => id.toString() !== courseId) : [...profile.savedCourses, courseId];
  await profile.save();
  await profile.populate('savedCourses');
  res.json(profile);
};
