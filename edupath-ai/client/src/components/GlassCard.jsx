import { motion } from 'framer-motion';
const MotionDiv = motion.div;
const GlassCard = ({ children, className = '' }) => <MotionDiv initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className={`glass rounded-3xl ${className}`}>{children}</MotionDiv>;
export default GlassCard;
