# Aithena LMS - Learning Management System

A comprehensive, production-ready Learning Management System (LMS) built with the MERN stack. Features role-based access control, interactive courses, assignments, quizzes with auto-grading, and text-to-speech functionality.

![Aithena LMS](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Aithena+LMS)

## 🚀 Features

### Core Functionality
- **Role-Based Access Control**: Admin, Teacher, and Student roles with specific permissions
- **Interactive Courses**: Create and manage courses with multimedia content
- **Text-to-Speech**: Convert lecture content to audio for accessibility
- **Assignment Management**: Create, submit, and grade assignments with file uploads
- **Auto-Grading Quizzes**: Build interactive quizzes with automatic scoring
- **Progress Tracking**: Monitor student progress and course completion
- **File Upload System**: Support for PDFs, videos, and documents via Cloudinary

### User Roles & Capabilities

#### 👨‍💼 Admin
- User management (CRUD operations)
- System statistics and analytics
- Activate/deactivate users
- Assign roles and permissions
- View platform-wide reports

#### 👨‍🏫 Teacher
- Create and manage courses
- Upload lectures with multimedia content
- Create assignments with deadlines
- Build quizzes with auto-grading
- View student submissions and progress
- Generate course analytics

#### 👨‍🎓 Student
- Browse and enroll in courses
- Access lecture content with TTS
- Submit assignments with file uploads
- Take quizzes and view results
- Track learning progress
- View grades and feedback

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Heroicons** for UI icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer + Cloudinary** for file uploads
- **Express Rate Limiting** for security

### Development Tools
- **Nodemon** for backend development
- **ESLint** for code linting
- **Prettier** for code formatting

## 📁 Project Structure

```
aithena-lms/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Header.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── layouts/
│   │   │   ├── LandingLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   ├── admin/
│   │   │   │   └── AdminDashboard.jsx
│   │   │   ├── teacher/
│   │   │   │   └── TeacherDashboard.jsx
│   │   │   └── student/
│   │   │       └── StudentDashboard.jsx
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   │   ├── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Lecture.js
│   │   ├── Assignment.js
│   │   └── Quiz.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── course.js
│   │   ├── lecture.js
│   │   ├── assignment.js
│   │   └── quiz.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.template
└── README.md
```

## 🗄 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['admin', 'teacher', 'student'],
  status: Enum ['active', 'inactive'],
  enrolledCourses: [ObjectId],
  createdCourses: [ObjectId],
  profileImage: String
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  teacher: ObjectId (User),
  enrolledStudents: [{
    student: ObjectId (User),
    enrolledAt: Date,
    progress: Number
  }],
  category: String,
  level: String,
  duration: Number,
  status: Enum ['draft', 'published', 'archived']
}
```

### Lecture Model
```javascript
{
  course: ObjectId (Course),
  title: String,
  content: String,
  ttsText: String,
  order: Number,
  duration: Number,
  resources: [{
    name: String,
    url: String,
    type: String
  }]
}
```

### Assignment Model
```javascript
{
  course: ObjectId (Course),
  title: String,
  description: String,
  deadline: Date,
  maxPoints: Number,
  submissions: [{
    student: ObjectId (User),
    submittedAt: Date,
    files: [{ name: String, url: String }],
    grade: Number,
    feedback: String
  }]
}
```

### Quiz Model
```javascript
{
  course: ObjectId (Course),
  title: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    points: Number
  }],
  timeLimit: Number,
  passingScore: Number,
  attempts: [{
    student: ObjectId (User),
    answers: [Number],
    score: Number,
    passed: Boolean
  }]
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aithena-lms.git
   cd aithena-lms
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.template .env
   # Edit .env with your configuration
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create `.env` file in backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/aithena-lms
   JWT_ACCESS_SECRET=your-super-secret-access-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   JWT_ACCESS_EXPIRE=15m
   JWT_REFRESH_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

5. **Seed Database (Optional)**
   ```bash
   cd backend
   ```

6. **Start Development Servers**

   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 👤 Default Users

After running the seed script, you can login with these credentials:

### Admin
- Email: `admin@aithena.com`
- Password: `admin123`

### Teachers
- Sarah Johnson: `sarah.johnson@aithena.com` / `teacher123`
- Michael Chen: `michael.chen@aithena.com` / `teacher123`

### Students
- Alice Wilson: `alice.wilson@email.com` / `student123`
- Bob Davis: `bob.davis@email.com` / `student123`
- Carol Brown: `carol.brown@email.com` / `student123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/admin/stats` - Get system statistics

### Courses
- `GET /api/courses/public` - Get public courses
- `GET /api/courses/my-courses` - Get teacher's courses
- `GET /api/courses/enrolled` - Get student's enrolled courses
- `POST /api/courses` - Create course (Teacher)
- `PUT /api/courses/:id` - Update course (Teacher)
- `DELETE /api/courses/:id` - Delete course (Teacher)

### Lectures
- `GET /api/lectures/course/:courseId` - Get course lectures
- `POST /api/lectures` - Create lecture (Teacher)
- `PUT /api/lectures/:id` - Update lecture (Teacher)
- `DELETE /api/lectures/:id` - Delete lecture (Teacher)

### Assignments
- `GET /api/assignments/course/:courseId` - Get course assignments
- `POST /api/assignments` - Create assignment (Teacher)
- `PUT /api/assignments/:id` - Update assignment (Teacher)
- `DELETE /api/assignments/:id` - Delete assignment (Teacher)
- `POST /api/assignments/:id/submit` - Submit assignment (Student)

### Quizzes
- `GET /api/quizzes/course/:courseId` - Get course quizzes
- `POST /api/quizzes` - Create quiz (Teacher)
- `PUT /api/quizzes/:id` - Update quiz (Teacher)
- `DELETE /api/quizzes/:id` - Delete quiz (Teacher)
- `POST /api/quizzes/:id/attempt` - Start quiz attempt (Student)
- `POST /api/quizzes/:id/submit` - Submit quiz attempt (Student)

## 🎨 UI/UX Design

### Color Palette
- **Primary**: Blue (#3b82f6, #1d4ed8)
- **Secondary**: Gray (#64748b, #1e293b)
- **Accent**: Green (#10b981), Purple (#8b5cf6), Orange (#f59e0b)

### Design Principles
- Clean, modern interface
- Responsive design (mobile-first)
- Consistent spacing and typography
- Intuitive navigation
- Accessibility-focused (WCAG compliant)

### Components
- Modern card-based layouts
- Interactive buttons and forms
- Progress indicators
- Data tables with sorting/filtering
- Modal dialogs for actions
- Toast notifications

## 🔒 Security Features

- **JWT Authentication** with access/refresh tokens
- **Password Hashing** using bcrypt
- **Rate Limiting** on API endpoints
- **CORS** configuration
- **Helmet** for security headers
- **Input Validation** using express-validator
- **File Upload Security** with type/size restrictions

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to cloud platform (Heroku, Railway, Render, etc.)
3. Set up MongoDB Atlas for database
4. Configure Cloudinary for file storage

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Configure environment variables for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Heroicons](https://heroicons.com/)
- UI components inspired by modern design systems
- Special thanks to the open-source community

## 📞 Support

For support, email support@aithenalms.com or join our Discord community.

---

**Built with ❤️ for better education**

