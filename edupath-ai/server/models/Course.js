import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: String, required: true, index: true },
  subCategory: String,
  description: { type: String, required: true },
  longDescription: String,
  image: String,
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  duration: String,
  skills: [String],
  tags: [String],
  careerPaths: [String],
  learningStyle: String,
  prerequisites: [String],
  outcomes: [String],
  reasonToChoose: String,
  rating: { type: Number, default: 4.7 },
  studentsEnrolled: { type: Number, default: 0 },
  instructor: String,
  recommendedNextCourses: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Course', courseSchema);
