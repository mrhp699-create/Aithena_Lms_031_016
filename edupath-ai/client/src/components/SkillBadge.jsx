const SkillBadge = ({ children, active }) => <span className={`chip ${active ? 'border-cyan-300/50 bg-cyan-300/15 text-cyan-100' : ''}`}>{children}</span>;
export default SkillBadge;
