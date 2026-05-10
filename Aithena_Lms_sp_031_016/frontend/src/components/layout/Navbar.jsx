import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bars3Icon, CpuChipIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { label: 'AI Advisor', href: '/#advisor' },
  { label: 'Features', href: '/#features' },
  { label: 'Courses', href: '/#courses' },
  { label: 'About', href: '/#about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 transition group-hover:-translate-y-0.5">
              <CpuChipIcon className="h-7 w-7" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 rounded-full bg-emerald-400 ring-4 ring-slate-950" />
            </div>
            <div>
              <span className="block text-xl font-black tracking-tight text-white">Aithena AI</span>
              <span className="block text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Course Portal</span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="text-sm font-bold text-slate-300 transition hover:text-cyan-300">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated ? (
              <>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200">
                  Welcome, {user?.name?.split(' ')[0]}
                </div>
                <button onClick={handleLogout} className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold text-slate-300 transition hover:text-white">
                  Login
                </Link>
                <Link to="/register" className="inline-flex items-center rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5">
                  <SparklesIcon className="mr-2 h-4 w-4" />
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white md:hidden" aria-label="Toggle menu">
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 pb-5 pt-2 backdrop-blur-2xl md:hidden">
          <div className="space-y-2">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-cyan-300">
                {link.label}
              </a>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full rounded-2xl bg-white/10 px-4 py-3 text-left text-sm font-bold text-white"
              >
                Logout
              </button>
            ) : (
              <div className="grid gap-2 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-bold text-white">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-black text-slate-950">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
