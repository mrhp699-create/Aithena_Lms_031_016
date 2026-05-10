const ProgressBar = ({ value = 0, className = '' }) => <div className={`h-3 overflow-hidden rounded-full bg-white/10 ${className}`}><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-purple-400 to-emerald-300 transition-all duration-700" style={{ width: `${Math.min(100, value)}%` }}/></div>;
export default ProgressBar;
