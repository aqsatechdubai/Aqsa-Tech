import { motion } from 'framer-motion';
import React from 'react';

interface MobileMenuLinkProps {
  id: string;
  label: string;
  isActive: boolean;
  hoveredMenuLink: string | null;
  setHoveredMenuLink: (id: string | null) => void;
  onClick: () => void;
  layoutId?: string; // e.g. "menuHover"
}

export const MobileMenuLink: React.FC<MobileMenuLinkProps> = ({
  id,
  label,
  isActive,
  hoveredMenuLink,
  setHoveredMenuLink,
  onClick,
  layoutId = "menuHover"
}) => {
  const isHoveredOrActive = hoveredMenuLink === id || isActive;

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHoveredMenuLink(id)}
      onHoverEnd={() => setHoveredMenuLink(null)}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`relative block w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full ${
        isHoveredOrActive ? 'text-brand-blue' : 'text-gray-900 hover:text-brand-blue'
      } text-left`}
      style={{
        color: isHoveredOrActive ? undefined : '#111827',
      }}
    >
      {isHoveredOrActive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/80 backdrop-blur-[20px] backdrop-saturate-[180%] border border-gray-200/50 shadow-sm"
          layoutId={layoutId}
          transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.6 }}
        />
      )}
      <motion.span
        className="relative z-10 block"
        animate={{
          scale: isHoveredOrActive ? 1.05 : 1,
          fontWeight: isHoveredOrActive ? 600 : 500,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
};
