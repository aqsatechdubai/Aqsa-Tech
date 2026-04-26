import { motion } from 'framer-motion';
import React from 'react';

interface DesktopNavLinkProps {
  id: string;
  label: string;
  isActive: boolean;
  hoveredLink: string | null;
  setHoveredLink: (id: string | null) => void;
  onClick: () => void;
}

export const DesktopNavLink: React.FC<DesktopNavLinkProps> = ({
  id,
  label,
  isActive,
  hoveredLink,
  setHoveredLink,
  onClick,
}) => {
  const isHoveredOrActive = hoveredLink === id || isActive;

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHoveredLink(id)}
      onHoverEnd={() => setHoveredLink(null)}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      className={`relative px-3 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm font-medium transition-all duration-300 rounded-full ${
        isHoveredOrActive ? 'text-brand-blue' : 'text-gray-700 hover:text-brand-blue'
      }`}
    >
      {isHoveredOrActive && (
        <motion.div
          className="absolute inset-[0px] rounded-full backdrop-blur-[20px] backdrop-saturate-[180%] border shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_16px_rgba(0,0,0,0.1)]"
          style={{
            background: 'rgba(255,255,255,0.75)',
            borderColor: 'rgba(255,255,255,0.3)',
          }}
          layoutId="navHover"
          transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.6 }}
        />
      )}
      <motion.span
        className="relative z-10"
        initial={false}
        animate={{
          scale: isHoveredOrActive ? 1.28 : 1,
          fontWeight: isHoveredOrActive ? 600 : 500,
          letterSpacing: isHoveredOrActive ? '0.02em' : '0em',
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 20, mass: 0.75 }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
};
