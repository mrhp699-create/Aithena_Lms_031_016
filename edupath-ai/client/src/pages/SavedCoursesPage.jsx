import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import api from '../services/api';
const SavedCoursesPage = () => { const [courses,setCourses]=useState([]); useEffect(()=>{api.get('/profile/me').then(r=>setCourses(r.data.savedCourses||[])).catch(()=>{});},[]); return <div className="page"><div className="section"><PageHeader eyebrow="Saved Courses" title="Your saved learning shortlist" text="Courses you saved from recommendations and course detail pages."/>{courses.length?<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{courses.map(c=><CourseCard key={c._id} course={c}/>)}</div>:<EmptyState title="No saved courses yet" text="Save a course from recommendations or course detail pages."/>}</div></div> };
export default SavedCoursesPage;
