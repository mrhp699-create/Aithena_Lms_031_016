import GlassCard from './GlassCard';
const StatCard = ({ icon: Icon, label, value, accent = 'text-cyan-300' }) => <GlassCard className="p-5"><Icon className={accent} size={28}/><div className="mt-4 text-3xl font-black">{value}</div><div className="mt-1 text-sm font-semibold text-slate-400">{label}</div></GlassCard>;
export default StatCard;
