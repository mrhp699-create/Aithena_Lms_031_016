import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  score: { type: Number, required: true },
  reasons: [String],
  matchedSkills: [String],
  matchedInterests: [String],
  suggestedNextCourse: String,
  learningPathPosition: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Recommendation', recommendationSchema);
