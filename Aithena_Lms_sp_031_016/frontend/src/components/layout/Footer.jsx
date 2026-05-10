import { Link } from 'react-router-dom';
import { CpuChipIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 text-slate-950">
                <CpuChipIcon className="h-7 w-7" />
              </div>
              <div>
                <div className="text-xl font-black text-white">Aithena AI</div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Course Portal</div>
              </div>
            </Link>
            <p className="mt-5 max-w-md leading-7 text-slate-400">
              A premium AI course recommendation portal that helps students choose the right learning path from their interests, goals, skill level, and available time.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200">
              <SparklesIcon className="h-4 w-4" />
              Personalized recommendations in seconds
            </div>
          </div>

          <div>
            <h3 className="font-black text-white">Platform</h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold">
              <li><a href="/#advisor" className="transition hover:text-cyan-300">AI Advisor</a></li>
              <li><a href="/#features" className="transition hover:text-cyan-300">Features</a></li>
              <li><a href="/#courses" className="transition hover:text-cyan-300">Courses</a></li>
              <li><a href="/#about" className="transition hover:text-cyan-300">About</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-white">Learners</h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold">
              <li><Link to="/register" className="transition hover:text-cyan-300">Create Profile</Link></li>
              <li><Link to="/login" className="transition hover:text-cyan-300">Student Login</Link></li>
              <li><a href="/#advisor" className="transition hover:text-cyan-300">Find a Course</a></li>
              <li><a href="/#contact" className="transition hover:text-cyan-300">Start Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-white">Team</h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-400">
              <li>Moaz Saeed</li>
              <li>SP23-BCS-031</li>
              <li>Areeba Khan</li>
              <li>SP23-BCS-016</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Aithena AI Course Portal. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">Built with <HeartIcon className="h-4 w-4 text-rose-400" /> for smarter learning decisions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
