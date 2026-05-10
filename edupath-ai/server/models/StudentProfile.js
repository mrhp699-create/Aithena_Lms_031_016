import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  educationLevel: String,
  academicField: String,
  interests: [String],
  preferredCategories: [String],
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  careerGoal: String,
  preferredTechnologies: [String],
  learningStyle: String,
  weeklyStudyTime: String,
  goalDescription: String,
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  savedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

export default mongoose.model('StudentProfile', studentProfileSchema);
