# Aithena AI — AI-Powered Personalized LMS and Course Recommendation Platform

Aithena AI is a complete MERN application for an Artificial Intelligence subject project. It demonstrates a content-based AI course recommendation engine inside a polished LMS-style product with student onboarding, dashboards, course exploration, learning paths, skill gap analysis, and an admin panel.

> Folder name is `edupath-ai` to match the requested runnable monorepo structure, while the visible product name is kept as **Aithena AI**.

## Features

- Futuristic React + Vite frontend with dark navy UI, gradients, glassmorphism cards, glowing borders, and animated interactions.
- JWT authentication with student/admin roles.
- Multi-step student onboarding form for education level, academic field, interests, skill level, career goal, technologies, learning style, and weekly study time.
- AI recommendation dashboard with match percentages, reasons, matched skills/interests, suggested next course, and learning path position.
- Course explorer with search, category, difficulty, career path, and sort filters.
- Course detail pages with overview, skills, outcomes, career relevance, suggested next step, save/start buttons.
- Learning path page with a vertical step-by-step roadmap.
- Skill gap analysis with required skills, current skills, missing skills, readiness score, and courses to close gaps.
- Saved courses page.
- Admin dashboard, course management, and analytics pages.
- Seed script creates demo users, a student profile, recommendations, and **112 courses** across 16 categories.

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React icons
- Framer Motion-compatible animation API
- Recharts-compatible dashboard chart components

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- dotenv
- cors
- multer dependency included for simple future image upload support

## AI Recommendation Explanation

The recommendation engine lives in `server/recommender/recommendationEngine.js` and implements a weighted content-based matching algorithm:

- Interest match: 30%
- Preferred category match: 20%
- Career goal match: 15%
- Skill level match: 15%
- Preferred technology/skills match: 15%
- Learning style match: 5%

It compares student profile signals against course metadata including category, subcategory, difficulty, learning style, skills, tags, and career paths. Each recommendation returns:

- `matchPercentage` / score
- Human-readable reasons
- Matched skills
- Matched interests
- Suggested next course
- Learning path position

Example explanation:

> Recommended because this course matches your interest in Artificial Intelligence, fits your Beginner skill level, uses technologies you selected such as Python, and supports your goal of becoming an AI Engineer.

## Folder Structure

```text
edupath-ai/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── data/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── recommender/
│   ├── seed/
│   ├── server.js
│   └── package.json
├── package.json
├── README.md
└── .env.example
```

## Environment Setup

Create a `.env` file from `.env.example`:

```bash
cp .env.example server/.env
```

Default values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/edupath_ai
JWT_SECRET=edupath_ai_secret_key
CLIENT_URL=http://localhost:5173
```

## How to Run

From the `edupath-ai` folder:

```bash
npm install
npm run install-all
cp .env.example server/.env
npm run seed
npm run dev
```

Or run separately:

```bash
npm run server
npm run client
```

Frontend: `http://localhost:5173`  
Backend API: `http://localhost:5000/api`

## Seed Database

```bash
npm run seed
```

The seed script creates:

- 112 professional courses
- 16 categories
- Demo student profile
- Demo AI recommendations
- Admin and student users

## Demo Login Credentials

### Student
- Email: `student@edupath.ai`
- Password: `password123`

### Admin
- Email: `admin@edupath.ai`
- Password: `admin123`

## Screens / Pages

- `/` Landing page
- `/login` Login page
- `/register` Registration page
- `/onboarding` Student AI profile onboarding
- `/dashboard` AI recommendations dashboard
- `/courses` Course explorer
- `/courses/:id` Course detail
- `/learning-path` Personalized learning path
- `/skill-gap` Skill gap analysis
- `/saved` Saved courses
- `/admin` Admin dashboard
- `/admin/courses` Admin course management
- `/admin/analytics` Admin analytics

## API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Student Profile
- `POST /api/profile`
- `GET /api/profile/me`
- `PUT /api/profile/me`
- `POST /api/profile/saved/:courseId`

### Courses
- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses` admin only
- `PUT /api/courses/:id` admin only
- `DELETE /api/courses/:id` admin only

### Recommendations
- `GET /api/recommendations/me`
- `POST /api/recommendations/generate`
- `GET /api/recommendations/learning-path`
- `GET /api/recommendations/skill-gap`

### Admin
- `GET /api/admin/stats`
- `GET /api/admin/users`
- `GET /api/admin/courses-summary`
