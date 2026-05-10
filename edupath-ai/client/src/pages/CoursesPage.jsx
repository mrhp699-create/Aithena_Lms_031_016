import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import api from '../services/api';
const CoursesPage = () => { const [courses,setCourses]=useState([]); const [filters,setFilters]=useState({sort:'rating'}); const [loading,setLoading]=useState(true); useEffect(()=>{const params=new URLSearchParams(Object.entries(filters).filter(([,v])=>v)); setLoading(true); api.get(`/courses?${params}`).then(r=>setCourses(r.data)).finally(()=>setLoading(false));},[filters]); return <div className="page"><div className="section"><PageHeader eyebrow="Course Explorer" title="Explore rich career-focused course categories" text="Search, filter, and compare AI-ready courses from the seeded catalog of 100+ professional learning options."/><FilterBar filters={filters} setFilters={setFilters}/>{loading?<LoadingSpinner/>:<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{courses.map(course=><CourseCard key={course._id} course={course}/>)}</div>}</div></div> };
export default CoursesPage;
