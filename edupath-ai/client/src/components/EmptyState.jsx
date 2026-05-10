import { Sparkles } from 'lucide-react';
const EmptyState = ({ title = 'Nothing here yet', text = 'Create your profile to unlock AI-powered learning insights.' }) => <div className="glass rounded-3xl p-10 text-center"><Sparkles className="mx-auto mb-4 text-cyan-300" size={36}/><h3 className="text-2xl font-black">{title}</h3><p className="mx-auto mt-2 max-w-xl text-slate-300">{text}</p></div>;
export default EmptyState;
