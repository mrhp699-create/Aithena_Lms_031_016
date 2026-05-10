import React from 'react';
const createMotion = tag => React.forwardRef(({ children, whileHover: _whileHover, whileTap: _whileTap, initial: _initial, animate: _animate, exit: _exit, transition: _transition, variants: _variants, viewport: _viewport, ...props }, ref) => React.createElement(tag, { ref, ...props }, children));
export const motion = new Proxy({}, { get: (_, tag) => createMotion(tag) });
export const AnimatePresence = ({ children }) => <>{children}</>;
export const useScroll = () => ({ scrollYProgress: 0 });
export const useTransform = (_, __, output) => output?.[0] ?? 0;
