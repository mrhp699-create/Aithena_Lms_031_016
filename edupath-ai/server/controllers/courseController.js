import Course from '../models/Course.js';

const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export const getCourses = async (req, res) => {
  const { search, category, difficulty, careerPath, sort = 'newest' } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;
  if (careerPath) filter.careerPaths = { $regex: careerPath, $options: 'i' };
  if (search) filter.$or = [
    { title: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
    { skills: { $regex: search, $options: 'i' } },
    { tags: { $regex: search, $options: 'i' } }
  ];
  const sortMap = { rating: { rating: -1 }, newest: { createdAt: -1 }, popular: { studentsEnrolled: -1 } };
  const courses = await Course.find(filter).sort(sortMap[sort] || sortMap.newest);
  res.json(courses);
};

export const getCourse = async (req, res) => {
  const course = await Course.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { slug: req.params.id }] });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

export const createCourse = async (req, res) => {
  const course = await Course.create({ ...req.body, slug: req.body.slug || slugify(req.body.title) });
  res.status(201).json(course);
};

export const updateCourse = async (req, res) => {
  const payload = { ...req.body };
  if (payload.title && !payload.slug) payload.slug = slugify(payload.title);
  const course = await Course.findByIdAndUpdate(req.params.id, payload, { new: true });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json({ message: 'Course deleted successfully' });
};
