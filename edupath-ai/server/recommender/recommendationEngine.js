const normalize = value => String(value || '').toLowerCase().trim();
const toArray = value => (Array.isArray(value) ? value : []).map(normalize).filter(Boolean);
const overlap = (studentValues, courseValues) => {
  const student = toArray(studentValues);
  const course = toArray(courseValues);
  return student.filter(item => course.some(courseItem => courseItem.includes(item) || item.includes(courseItem)));
};
const hasTextMatch = (needle, haystackValues) => {
  const query = normalize(needle);
  if (!query) return false;
  return toArray(haystackValues).some(item => item.includes(query) || query.includes(item));
};

export const generateRecommendations = (profile, courses) => {
  const recommendations = courses.map((course, index) => {
    const courseText = [course.category, course.subCategory, course.difficulty, course.learningStyle, ...(course.skills || []), ...(course.tags || []), ...(course.careerPaths || [])];
    const matchedInterests = overlap(profile.interests, courseText);
    const matchedSkills = overlap(profile.preferredTechnologies, [...(course.skills || []), ...(course.tags || [])]);
    const categoryMatches = overlap(profile.preferredCategories?.length ? profile.preferredCategories : profile.interests, [course.category, course.subCategory]);
    const careerMatch = hasTextMatch(profile.careerGoal, course.careerPaths) || hasTextMatch(profile.careerGoal, course.tags);
    const levelMatch = normalize(course.difficulty) === normalize(profile.skillLevel) || course.difficulty === 'Beginner';
    const styleMatch = normalize(course.learningStyle) === normalize(profile.learningStyle);

    let score = 0;
    score += Math.min(30, matchedInterests.length * 10);
    score += categoryMatches.length ? 20 : 0;
    score += careerMatch ? 15 : 0;
    score += levelMatch ? 15 : 7;
    score += Math.min(15, matchedSkills.length * 5);
    score += styleMatch ? 5 : 0;

    const tfidfSignals = overlap([...toArray(profile.interests), ...toArray(profile.preferredTechnologies), normalize(profile.academicField), normalize(profile.careerGoal)], courseText);
    score = Math.min(100, Math.round(score + Math.min(8, tfidfSignals.length * 1.2)));

    const reasons = [];
    if (matchedInterests.length) reasons.push(`matches your interest in ${matchedInterests.slice(0, 3).join(', ')}`);
    if (categoryMatches.length) reasons.push(`belongs to your preferred ${course.category} category`);
    if (careerMatch) reasons.push(`supports your goal of becoming a ${profile.careerGoal}`);
    if (levelMatch) reasons.push(`fits your ${profile.skillLevel || 'current'} skill level`);
    if (matchedSkills.length) reasons.push(`uses technologies you selected: ${matchedSkills.slice(0, 4).join(', ')}`);
    if (styleMatch) reasons.push(`matches your ${profile.learningStyle} learning style`);
    if (!reasons.length) reasons.push('adds valuable foundations for your academic and career profile');

    return {
      course,
      courseId: course._id,
      score,
      matchPercentage: score,
      reasons,
      whyRecommended: `Recommended because this course ${reasons.join(', ')}.`,
      matchedSkills,
      matchedInterests,
      suggestedNextCourse: course.recommendedNextCourses?.[0] || 'Build a portfolio project after completing this course',
      nextStepSuggestion: course.recommendedNextCourses?.[0] || 'Apply the skills in a capstone project',
      learningPathPosition: Math.min(6, index + 1)
    };
  });

  return recommendations.sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, learningPathPosition: index + 1 }));
};

export const careerSkillMap = {
  'AI Engineer': ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'NLP', 'Computer Vision', 'MLOps'],
  'Data Scientist': ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization', 'Pandas'],
  'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  'Cybersecurity Analyst': ['Linux', 'Networking', 'Web Security', 'Threat Analysis', 'Cloud Security'],
  'Cloud Engineer': ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Cloud Architecture'],
  'Mobile App Developer': ['Flutter', 'React Native', 'APIs', 'Firebase', 'UI Design'],
  'UI/UX Designer': ['Figma', 'Design Systems', 'User Research', 'Wireframing', 'Prototyping'],
  'Digital Marketer': ['SEO', 'Analytics', 'Content Strategy', 'Campaigns', 'Growth Marketing'],
  'Business Analyst': ['SQL', 'Dashboards', 'Business Analytics', 'Excel', 'Data Storytelling'],
  'DevOps Engineer': ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Monitoring', 'AWS']
};

export const buildSkillGap = (profile, courses) => {
  const requiredSkills = careerSkillMap[profile.careerGoal] || ['Problem Solving', 'Communication', 'Project Portfolio'];
  const existing = new Set(toArray([...(profile.preferredTechnologies || []), ...(profile.interests || [])]));
  const currentSkills = requiredSkills.filter(skill => existing.has(normalize(skill)) || [...existing].some(item => normalize(skill).includes(item) || item.includes(normalize(skill))));
  const missingSkills = requiredSkills.filter(skill => !currentSkills.includes(skill));
  const recommendedCourses = courses.filter(course => overlap(missingSkills, course.skills).length || overlap(missingSkills, course.tags).length).slice(0, 6);
  const readiness = Math.round((currentSkills.length / Math.max(requiredSkills.length, 1)) * 100);
  return { careerGoal: profile.careerGoal, requiredSkills, currentSkills, missingSkills, readiness, recommendedCourses };
};
