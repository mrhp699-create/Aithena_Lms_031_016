import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  ArrowRightIcon,
  BeakerIcon,
  BoltIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CursorArrowRaysIcon,
  LightBulbIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const interests = [
  { id: 'ai', label: 'AI & Machine Learning', icon: CpuChipIcon },
  { id: 'data', label: 'Data Analytics', icon: ChartBarIcon },
  { id: 'web', label: 'Web Development', icon: CodeBracketIcon },
  { id: 'design', label: 'UX/UI Design', icon: PaintBrushIcon },
  { id: 'business', label: 'Business Strategy', icon: BriefcaseIcon },
  { id: 'cloud', label: 'Cloud & DevOps', icon: BoltIcon },
];

const courseCatalog = [
  {
    title: 'AI Product Builder Professional',
    track: 'Artificial Intelligence',
    level: 'Intermediate',
    duration: '8 weeks',
    matchTags: ['ai', 'business', 'web'],
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    rating: 4.9,
    learners: '18.4k',
    outcome: 'Design, prompt, prototype, and launch intelligent AI-powered products.',
    modules: ['Prompt systems', 'LLM workflows', 'AI product strategy'],
  },
  {
    title: 'Full Stack React Engineering',
    track: 'Software Development',
    level: 'Beginner to Advanced',
    duration: '12 weeks',
    matchTags: ['web', 'cloud', 'ai'],
    gradient: 'from-violet-400 via-fuchsia-500 to-rose-500',
    rating: 4.8,
    learners: '24.1k',
    outcome: 'Build production-grade web apps with React, APIs, dashboards, and deployment.',
    modules: ['React systems', 'API integration', 'Cloud deployment'],
  },
  {
    title: 'Data Science Career Accelerator',
    track: 'Data & Analytics',
    level: 'Intermediate',
    duration: '10 weeks',
    matchTags: ['data', 'ai', 'business'],
    gradient: 'from-emerald-300 via-teal-500 to-cyan-600',
    rating: 4.9,
    learners: '31.8k',
    outcome: 'Analyze real datasets, build predictive models, and communicate insights.',
    modules: ['Python analytics', 'ML models', 'Executive dashboards'],
  },
  {
    title: 'Premium UX Design Studio',
    track: 'Design',
    level: 'Beginner',
    duration: '6 weeks',
    matchTags: ['design', 'business', 'web'],
    gradient: 'from-amber-300 via-orange-500 to-pink-500',
    rating: 4.7,
    learners: '15.6k',
    outcome: 'Create polished interfaces, design systems, research flows, and portfolios.',
    modules: ['Design systems', 'User research', 'Motion UI'],
  },
  {
    title: 'Cloud DevOps Mastery Lab',
    track: 'Cloud Infrastructure',
    level: 'Advanced',
    duration: '9 weeks',
    matchTags: ['cloud', 'web', 'data'],
    gradient: 'from-sky-300 via-blue-600 to-slate-900',
    rating: 4.8,
    learners: '12.9k',
    outcome: 'Deploy scalable systems with CI/CD, containers, observability, and security.',
    modules: ['Docker & CI/CD', 'Cloud architecture', 'Monitoring'],
  },
  {
    title: 'Digital Business & Growth Analytics',
    track: 'Business',
    level: 'Beginner to Intermediate',
    duration: '7 weeks',
    matchTags: ['business', 'data', 'design'],
    gradient: 'from-lime-300 via-green-500 to-emerald-700',
    rating: 4.8,
    learners: '21.3k',
    outcome: 'Use analytics, market research, and experimentation to grow digital ventures.',
    modules: ['Growth loops', 'KPI analytics', 'Go-to-market'],
  },
];

const learningGoals = [
  'Get job-ready skills',
  'Build a portfolio project',
  'Switch my career path',
  'Improve academic performance',
];

const stats = [
  { value: '96%', label: 'recommendation precision', icon: CursorArrowRaysIcon },
  { value: '42k+', label: 'guided learners', icon: UserGroupIcon },
  { value: '1.8M', label: 'skill signals analyzed', icon: SparklesIcon },
  { value: '4.9/5', label: 'student experience', icon: StarIcon },
];

const steps = [
  {
    title: 'Tell us your interests',
    copy: 'Students select passions, current skill level, time availability, and learning goals through a polished onboarding form.',
  },
  {
    title: 'AI scores every pathway',
    copy: 'The recommendation engine ranks courses by topic fit, ambition, workload, and practical career outcomes.',
  },
  {
    title: 'Start a curated roadmap',
    copy: 'Learners receive premium course cards, weekly milestones, project outcomes, and next-best recommendations.',
  },
];

const testimonials = [
  {
    name: 'Ayesha Malik',
    role: 'Computer Science Student',
    quote: 'Aithena mapped my AI interests to a clear course roadmap and helped me choose a project-based learning path.',
  },
  {
    name: 'Hamza Farooq',
    role: 'Career Switcher',
    quote: 'The portal feels premium and the recommendations made it obvious which course matched my time and goals.',
  },
  {
    name: 'Sana Ahmed',
    role: 'UX Learner',
    quote: 'I loved the interactive form, animated dashboard, and detailed course match explanations.',
  },
];

const getScore = (course, selectedInterests, level, goal) => {
  const interestScore = course.matchTags.reduce(
    (score, tag) => score + (selectedInterests.includes(tag) ? 32 : 0),
    0,
  );
  const levelScore = course.level.toLowerCase().includes(level.toLowerCase()) ? 14 : 7;
  const goalScore = goal.includes('portfolio') || goal.includes('job') ? 10 : 6;
  return Math.min(99, 42 + interestScore + levelScore + goalScore);
};

const LandingPage = () => {
  const [selectedInterests, setSelectedInterests] = useState(['ai', 'web']);
  const [level, setLevel] = useState('Beginner');
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [goal, setGoal] = useState(learningGoals[0]);

  const recommendations = useMemo(() => {
    return courseCatalog
      .map(course => ({
        ...course,
        score: getScore(course, selectedInterests, level, goal),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [goal, level, selectedInterests]);

  const toggleInterest = interestId => {
    setSelectedInterests(current => {
      if (current.includes(interestId)) {
        return current.length === 1 ? current : current.filter(id => id !== interestId);
      }
      return [...current, interestId];
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative isolate px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.22),transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#111827_100%)]" />
        <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />
        <div className="absolute right-6 top-40 hidden h-28 w-28 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl lg:block animate-float" />
        <div className="absolute bottom-20 left-10 hidden h-20 w-20 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 lg:block animate-float-delayed" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl">
              <SparklesIcon className="h-5 w-5 text-cyan-300" />
              AI Course Recommendation Portal
            </div>
            <h1 className="max-w-5xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Discover the perfect course with a premium{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                AI learning advisor.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Aithena turns student interests, goals, time, and skill level into intelligent course recommendations with a cinematic interface designed for modern learners.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#advisor" className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-4 text-base font-bold text-slate-950 shadow-2xl shadow-cyan-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-400/40">
                Try AI Advisor
                <ArrowRightIcon className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <Link to="/register" className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                Create learner profile
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map(item => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <item.icon className="mb-3 h-6 w-6 text-cyan-300" />
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up animation-delay-200" id="advisor">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 opacity-60 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Live matching</p>
                    <h2 className="mt-2 text-2xl font-black">Student Interest Form</h2>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/10 px-3 py-2 text-sm font-bold text-emerald-300 ring-1 ring-emerald-300/20">AI Online</div>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <label className="text-sm font-bold text-slate-200">Choose interests</label>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {interests.map(item => {
                        const active = selectedInterests.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleInterest(item.id)}
                            className={`group rounded-2xl border p-3 text-left transition duration-300 hover:-translate-y-1 ${
                              active
                                ? 'border-cyan-300/60 bg-cyan-300/15 shadow-lg shadow-cyan-950/40'
                                : 'border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]'
                            }`}
                          >
                            <item.icon className={`mb-2 h-6 w-6 ${active ? 'text-cyan-300' : 'text-slate-400 group-hover:text-white'}`} />
                            <span className="text-sm font-semibold text-white">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-bold text-slate-200" htmlFor="level">Current level</label>
                      <select id="level" value={level} onChange={event => setLevel(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none ring-cyan-300/30 transition focus:ring-4">
                        <option className="bg-slate-900">Beginner</option>
                        <option className="bg-slate-900">Intermediate</option>
                        <option className="bg-slate-900">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-200" htmlFor="hours">Weekly hours: {weeklyHours}</label>
                      <input id="hours" type="range" min="3" max="20" value={weeklyHours} onChange={event => setWeeklyHours(event.target.value)} className="mt-5 w-full accent-cyan-300" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-200" htmlFor="goal">Learning goal</label>
                    <select id="goal" value={goal} onChange={event => setGoal(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none ring-cyan-300/30 transition focus:ring-4">
                      {learningGoals.map(item => (
                        <option key={item} className="bg-slate-900">{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {recommendations.map((course, index) => (
                  <div key={course.title} className="group rounded-[1.35rem] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.1]">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${course.gradient} text-lg font-black text-white shadow-lg`}>
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-black text-white">{course.title}</h3>
                          <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-sm font-black text-cyan-200">{course.score}%</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-300">{course.outcome}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                          <span className="rounded-full bg-white/10 px-2.5 py-1">{course.track}</span>
                          <span className="rounded-full bg-white/10 px-2.5 py-1">{course.duration}</span>
                          <span className="rounded-full bg-white/10 px-2.5 py-1">{weeklyHours} hrs/week plan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative bg-slate-50 px-4 py-24 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-600">Recommendation intelligence</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Built like a premium AI counseling desk.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">The portal combines elegant UX with practical decision logic so students understand why every course is recommended.</p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-white shadow-lg shadow-slate-400/40">0{index + 1}</div>
                <h3 className="text-2xl font-black">{step.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{step.copy}</p>
                <div className="mt-8 inline-flex items-center text-sm font-black text-blue-600">
                  Explore flow <ChevronRightIcon className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="bg-white px-4 py-24 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-fuchsia-600">Curated pathways</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">High-impact courses matched to student intent.</h2>
            </div>
            <Link to="/register" className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-blue-700">
              Build my roadmap <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {courseCatalog.slice(0, 6).map(course => (
              <article key={course.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className={`h-3 bg-gradient-to-r ${course.gradient}`} />
                <div className="p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-600">{course.track}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500"><StarIconSolid className="h-4 w-4" /> {course.rating}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black leading-tight">{course.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{course.outcome}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1"><ClockIcon className="h-4 w-4" /> {course.duration}</span>
                    <span className="inline-flex items-center gap-1"><AcademicCapIcon className="h-4 w-4" /> {course.learners}</span>
                  </div>
                  <div className="mt-6 space-y-2">
                    {course.modules.map(module => (
                      <div key={module} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                        {module}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Premium student experience</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">A smarter portal for confident course decisions.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Aithena is redesigned as an AI-first course recommendation portal with modern animations, glassmorphism, responsive layouts, and recommendation cards that make learning choices clear.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Personalized course ranking', 'Skill-level aware roadmap', 'Career outcome matching', 'Premium animated dashboard'].map(item => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 font-bold text-slate-100 backdrop-blur-xl">
                  <CheckCircleIcon className="mb-3 h-6 w-6 text-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {testimonials.map(testimonial => (
                <div key={testimonial.name} className="rounded-3xl bg-white p-6 text-slate-950 shadow-xl first:sm:col-span-2">
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map(star => <StarIconSolid key={star} className="h-5 w-5" />)}
                  </div>
                  <p className="mt-4 leading-7 text-slate-600">“{testimonial.quote}”</p>
                  <div className="mt-5 font-black">{testimonial.name}</div>
                  <div className="text-sm font-semibold text-slate-500">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-gradient-to-br from-cyan-50 via-white to-fuchsia-50 px-4 py-24 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-center text-white shadow-2xl shadow-slate-300/80 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
            <RocketLaunchIcon className="h-9 w-9" />
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">Ready to recommend the right course?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Launch a student profile, capture interests, and let Aithena generate a focused learning path with premium UX.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="#advisor" className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-7 py-4 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200">
              Open AI advisor <SparklesIcon className="ml-2 h-5 w-5" />
            </a>
            <Link to="/login" className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white/15">
              Login to portal
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: TrophyIcon, label: 'Outcome-led recommendations' },
              { icon: LightBulbIcon, label: 'Student interest mapping' },
              { icon: BeakerIcon, label: 'AI-powered exploration' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-slate-200">
                <item.icon className="mx-auto mb-2 h-6 w-6 text-cyan-300" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
