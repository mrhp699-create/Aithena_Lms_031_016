export const ResponsiveContainer = ({ children }) => <div className="h-full w-full">{children}</div>;
export const PieChart = ({ children }) => <div className="grid place-items-center rounded-3xl border border-white/10 bg-white/5 p-6">{children}</div>;
export const Pie = () => <div className="h-32 w-32 rounded-full bg-conic-gradient" />;
export const Cell = () => null;
export const BarChart = ({ children }) => <div className="space-y-2">{children}</div>;
export const Bar = () => null;
export const XAxis = () => null;
export const YAxis = () => null;
export const Tooltip = () => null;
