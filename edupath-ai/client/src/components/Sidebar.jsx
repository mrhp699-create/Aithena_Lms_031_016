import { NavLink } from 'react-router-dom';
const Sidebar = ({ links = [] }) => <aside className="glass hidden rounded-3xl p-4 lg:block">{links.map(([to,label]) => <NavLink key={to} to={to} className={({isActive}) => `mb-2 block rounded-2xl px-4 py-3 font-bold ${isActive?'bg-white/15 text-cyan-200':'text-slate-300 hover:bg-white/10'}`}>{label}</NavLink>)}</aside>;
export default Sidebar;
