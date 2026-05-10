import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Course from '../models/Course.js';
import Recommendation from '../models/Recommendation.js';
import StudentProfile from '../models/StudentProfile.js';
import User from '../models/User.js';
import { generateRecommendations } from '../recommender/recommendationEngine.js';
import { categories, namedCourses } from './seedData.js';

dotenv.config();
await connectDB();

const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const styles = ['Project-based', 'Theory-based', 'Visual learning', 'Practical labs', 'Career-focused'];
const titleTemplates = ['Foundations','Professional Bootcamp','Career Accelerator','Hands-on Projects','Advanced Lab','Portfolio Masterclass','Industry Essentials'];
const image = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const buildCourses = () => {
  const courses = [];
  categories.forEach((category, categoryIndex) => {
    const titles = namedCourses[category.name] || titleTemplates.map(template => `${category.name} ${template}`);
    while (titles.length < 7) titles.push(`${category.name} ${titleTemplates[titles.length % titleTemplates.length]}`);
    titles.slice(0, 7).forEach((title, index) => {
      const difficulty = difficulties[index % difficulties.length];
      const selectedSkills = [...category.skills.slice(0, 4), category.skills[(index + 2) % category.skills.length]];
      courses.push({
        title,
        slug: slugify(title),
        category: category.name,
        subCategory: `${category.name} ${difficulty} Track`,
        description: `A ${difficulty.toLowerCase()} level course for building practical ${category.name.toLowerCase()} skills through guided lessons and portfolio-ready tasks.`,
        longDescription: `This professional ${category.name} course is designed for learners who want structured, career-focused progress. You will learn core concepts, complete realistic labs, analyze industry use cases, and produce evidence of skill through assignments that can be discussed in interviews and academic presentations.`,
        image: image(category.image),
        difficulty,
        duration: `${4 + (index % 6)} weeks`,
        skills: selectedSkills,
        tags: [category.name, difficulty, ...selectedSkills, ...category.careers],
        careerPaths: category.careers,
        learningStyle: styles[(categoryIndex + index) % styles.length],
        prerequisites: difficulty === 'Beginner' ? ['Basic computer literacy'] : ['Foundational knowledge', category.skills[0]],
        outcomes: [
          `Explain important ${category.name.toLowerCase()} concepts with confidence`,
          `Build a practical portfolio artifact using ${selectedSkills[0]} and ${selectedSkills[1]}`,
          `Connect course skills to ${category.careers[0]} responsibilities`
        ],
        reasonToChoose: `Choose this course if you want a polished route into ${category.name} with clear outcomes, practical examples, and career alignment.`,
        rating: Number((4.55 + ((index + categoryIndex) % 5) / 10).toFixed(1)),
        studentsEnrolled: 900 + categoryIndex * 250 + index * 137,
        instructor: ['Dr. Sarah Khan','Moaz Saeed','Areeba Khan','Alex Carter','Nadia Rehman'][index % 5],
        recommendedNextCourses: [`${category.name} ${titleTemplates[(index + 1) % titleTemplates.length]}`, `${category.name} Capstone Project`]
      });
    });
  });
  return courses;
};

const seed = async () => {
  await Promise.all([User.deleteMany(), StudentProfile.deleteMany(), Course.deleteMany(), Recommendation.deleteMany()]);
  const [student, admin] = await User.create([
    { name: 'Demo Student', email: 'student@edupath.ai', password: 'password123', role: 'student', avatar: 'https://i.pravatar.cc/160?img=32' },
    { name: 'Admin Mentor', email: 'admin@edupath.ai', password: 'admin123', role: 'admin', avatar: 'https://i.pravatar.cc/160?img=12' }
  ]);
  const courses = await Course.insertMany(buildCourses());
  const profile = await StudentProfile.create({
    userId: student._id,
    educationLevel: 'Bachelor',
    academicField: 'Computer Science',
    interests: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Web Development'],
    preferredCategories: ['Artificial Intelligence', 'Machine Learning', 'MERN Stack Development'],
    skillLevel: 'Beginner',
    careerGoal: 'AI Engineer',
    preferredTechnologies: ['Python', 'JavaScript', 'React', 'TensorFlow', 'MongoDB'],
    learningStyle: 'Project-based',
    weeklyStudyTime: '8-10',
    goalDescription: 'I want to become an AI engineer who can build intelligent full-stack products.'
  });
  const ranked = generateRecommendations(profile, courses).slice(0, 10);
  await Recommendation.insertMany(ranked.map(item => ({ userId: student._id, courseId: item.course._id, score: item.score, reasons: item.reasons, matchedSkills: item.matchedSkills, matchedInterests: item.matchedInterests, suggestedNextCourse: item.suggestedNextCourse, learningPathPosition: item.learningPathPosition })));
  console.log(`Seeded ${courses.length} courses, demo users, profile, and AI recommendations.`);
  process.exit(0);
};

seed().catch(error => { console.error(error); process.exit(1); });
