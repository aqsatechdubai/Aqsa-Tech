"use client";
import {  useRouter , usePathname } from 'next/navigation';
import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { Zap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { DesktopNavLink } from './navbar/DesktopNavLink';
import { useLanguage } from '../contexts/LanguageContext';

// Nested Menu Items for Services
const servicesNestedItems = [
  { title: 'AC Services', path: '/services/ac-installation' },
  { title: 'Plumbing & Sanitary', path: '/services/plumbing-sanitary' },
  { title: 'Painting', path: '/services/painting-contracting' },
  { title: 'Carpentry & Flooring', path: '/services/carpentry-flooring' },
  { title: 'Electrical Works', path: '/services/electromechanical-equipment' },
  { title: 'Tiling', path: '/services/floor-and-wall-tiling' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  
  const pathname = usePathname();
  const ___router = useRouter();
  const navigate = (path: string | number) => { if (typeof path === "number" && path === -1) { ___router.back(); } else if (typeof path === "string") { ___router.push(path); } };
  const { t } = useLanguage();

  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'services' | 'contact' | null>('home');

  const isHomeActive = pathname ==='/' && (!activeSection || activeSection === 'home');
  const isAboutActive = pathname ==='/' && activeSection === 'about';
  const isServicesSectionActive = pathname ==='/' && activeSection === 'services';
  const isContactActive = pathname ==='/' && activeSection === 'contact';
  const isBlogActive = pathname?.startsWith('/blog');
  const isServicesActive = pathname?.startsWith('/services') || isServicesSectionActive;

  const navHome = t('nav.home');
  const navAbout = t('nav.about');
  const navServices = t('nav.services');
  const navBlog = t('nav.blog');
  const navContact = t('nav.contact');

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          if (pathname ==='/') {
            const hero = document.getElementById('hero');
            const servicesSection = document.getElementById('services');
            const contact = document.getElementById('contact');
            const y = window.scrollY;

            const heroTop = hero?.offsetTop ?? 0;
            const heroHeight = hero?.offsetHeight ?? 0;
            const heroBottom = heroTop + heroHeight;
            const servicesTop = servicesSection?.offsetTop ?? Number.POSITIVE_INFINITY;
            const contactTop = contact?.offsetTop ?? Number.POSITIVE_INFINITY;

            const probeY = y + 120;

            if (probeY < heroBottom - 80) {
              setActiveSection('home');
            } else if (probeY < servicesTop - 200) {
              setActiveSection('about');
            } else if (probeY < contactTop - 200) {
              setActiveSection('services');
            } else {
              setActiveSection('contact');
            }
          } else {
            setActiveSection(null);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    setIsServicesOpen(false);
    setIsNestedOpen(false);
  }, [pathname]);

  // Block body scroll when side menu is open
  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideMenuOpen]);

  const handleNavClick = (path: string) => {
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (pathname !==route) {
        navigate(route);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }

      if (hash === 'about') setActiveSection('about');
      if (hash === 'contact') setActiveSection('contact');
    } else {
      if (path === '/' && pathname ==='/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else {
        navigate(path);
      }
    }
    setIsServicesOpen(false);
    setIsNestedOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pt-2 sm:pt-2.5 pb-2 sm:pb-2.5"
    >
      <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-xl sm:rounded-2xl relative z-[100] isolate ${
        isScrolled 
          ? 'bg-white/[0.72] backdrop-blur-[40px] backdrop-saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.15)] border border-white/[0.18]' 
          : 'bg-white/[0.72] backdrop-blur-[40px] backdrop-saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.12)] border border-white/[0.18]'
      }`}>
        {/* iOS vibrancy layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] pointer-events-none" />
        <nav className="px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 navbar-nav">
          <div className="flex items-center justify-between w-full gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {/* Logo - Left Side */}
            <Link 
              href="/" 
              onClick={(e) => {
                if (pathname ==='/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveSection('home');
                }
              }}
              className="flex items-center group relative no-underline flex-shrink-0 min-w-0"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                className="relative flex items-center justify-center"
              >
                <img
                  src="/Logo Chatgpt.png"
                  alt="Aqsatech in Dubai - Aqsa Tech UAE Logo - Technical Services Dubai"
                  loading="eager"
                  fetchPriority="high"
                  className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 w-auto object-contain transition-all duration-300 group-hover:opacity-90 max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-20 xl:max-h-24"
                  onError={(e) => {
                    console.error('Logo failed to load');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-1 justify-center">
              <DesktopNavLink
                id="home"
                label={navHome}
                isActive={isHomeActive}
                hoveredLink={hoveredLink}
                setHoveredLink={setHoveredLink}
                onClick={() => handleNavClick('/')}
              />
              <DesktopNavLink
                id="about"
                label={navAbout}
                isActive={isAboutActive}
                hoveredLink={hoveredLink}
                setHoveredLink={setHoveredLink}
                onClick={() => handleNavClick('/#about')}
              />

              {/* Services Dropdown with Nested Menu */}
              <motion.div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => {
                  setIsServicesOpen(false);
                  setIsNestedOpen(false);
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredLink('services')}
                  onHoverEnd={() => setHoveredLink(null)}
                  className={`relative px-3 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold tracking-wide transition-all duration-300 rounded-full flex items-center gap-1.5 ${
                    isServicesActive || isServicesOpen || hoveredLink === 'services'
                      ? 'text-brand-blue'
                      : 'text-gray-700 hover:text-brand-blue'
                  }`}
                >
                  {(isServicesActive || isServicesOpen || hoveredLink === 'services') && (
                    <motion.div
                      className="absolute -inset-[1px] rounded-full backdrop-blur-[20px] backdrop-saturate-[180%] border shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_16px_rgba(0,0,0,0.1)]"
                      style={{
                        background: 'rgba(255,255,255,0.75)',
                        borderColor: 'rgba(255,255,255,0.3)',
                      }}
                      layoutId="navHover"
                      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.6 }}
                    />
                  )}
                  <motion.span
                    className="relative z-10 flex items-center gap-1.5"
                    animate={{ 
                      scale: isServicesActive || isServicesOpen || hoveredLink === 'services' ? 1.28 : 1,
                      fontWeight: isServicesActive || isServicesOpen || hoveredLink === 'services' ? 600 : 600,
                      letterSpacing: isServicesActive || isServicesOpen || hoveredLink === 'services' ? '0.02em' : '0em'
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
                  >
                    {navServices}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-300 ${!isServicesOpen ? 'rotate-0' : 'rotate-180'}`}
                    />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.6 }}
                      className="absolute left-0 top-full mt-2 w-[340px] rounded-3xl z-[9999] bg-white shadow-lg isolate"
                    >
                      <div className="relative bg-white/[0.98] backdrop-blur-[40px] backdrop-saturate-[200%] rounded-3xl border border-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]">
                        {/* Premium gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-purple-50/20 pointer-events-none rounded-3xl" />
                        
                        <div className="p-5 space-y-2.5 relative z-10">
                        {/* Popular Services Accordion */}
                        <div className="rounded-2xl">
                          <motion.button
                            onClick={() => setIsNestedOpen(!isNestedOpen)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="relative w-full text-left px-4 py-3 text-sm font-bold text-gray-800 rounded-2xl transition-all duration-200 flex items-center justify-between overflow-hidden group"
                          >
                            {/* Enhanced glass background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-[20px] border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] rounded-2xl"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                              <span className="text-brand-blue">✨</span>
                              Popular Services
                            </span>
                            <ChevronDown 
                              className={`w-4 h-4 text-brand-blue transition-transform duration-300 relative z-10 ${isNestedOpen ? 'rotate-180' : ''}`}
                            />
                          </motion.button>

                          <AnimatePresence>
                            {isNestedOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                className="overflow-hidden mt-2"
                              >
                                <div className="grid grid-cols-1 gap-2 px-1">
                                  {servicesNestedItems.map((item, index) => (
                                    <motion.button
                                      key={index}
                                      onClick={() => handleNavClick(item.path)}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.03 }}
                                      whileHover={{ scale: 1.02, x: 4 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="relative w-full text-left px-4 py-2.5 text-sm text-gray-700 rounded-xl transition-all duration-200 overflow-hidden group"
                                    >
                                      {/* Enhanced glass hover effect */}
                                      <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-purple-500/10 backdrop-blur-[10px] border border-brand-blue/20 shadow-[0_4px_12px_rgba(59,130,246,0.15)] rounded-xl"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                      />
                                      <span className="relative z-10 group-hover:text-brand-blue font-medium transition-colors duration-200 flex items-center gap-2">
                                        <span className="text-xs opacity-50">→</span>
                                        {item.title}
                                      </span>
                                    </motion.button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Premium divider */}
                        <div className="relative py-2">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
                          </div>
                        </div>

                        {/* All Services & Blog with enhanced styling */}
                        <motion.button
                          onClick={() => handleNavClick('/services')}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="relative w-full text-left px-4 py-3.5 text-sm rounded-2xl transition-all duration-200 overflow-hidden group"
                        >
                          {/* Premium glass background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-white/80 to-cyan-500/10 backdrop-blur-[20px] border border-brand-blue/30 shadow-[0_8px_20px_rgba(59,130,246,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] rounded-2xl"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <div className="relative z-10 flex items-start justify-between">
                            <div>
                              <div className="font-bold text-gray-900 group-hover:text-brand-blue transition-colors flex items-center gap-2">
                                <span>📋</span>
                                All Services
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                View complete catalog
                              </div>
                            </div>
                            <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </div>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleNavClick('/blog')}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="relative w-full text-left px-4 py-3.5 text-sm rounded-2xl transition-all duration-200 overflow-hidden group"
                        >
                          {/* Premium glass background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-white/80 to-pink-500/10 backdrop-blur-[20px] border border-purple-400/30 shadow-[0_8px_20px_rgba(168,85,247,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] rounded-2xl"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <div className="relative z-10 flex items-start justify-between">
                            <div>
                              <div className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors flex items-center gap-2">
                                <span>📝</span>
                                Blog & Tips
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                Helpful guides & insights
                              </div>
                            </div>
                            <span className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </div>
                        </motion.button>
                      </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <DesktopNavLink
                id="blog"
                label={navBlog}
                isActive={isBlogActive || false}
                hoveredLink={hoveredLink}
                setHoveredLink={setHoveredLink}
                onClick={() => handleNavClick('/blog')}
              />
              <DesktopNavLink
                id="contact"
                label={navContact}
                isActive={isContactActive}
                hoveredLink={hoveredLink}
                setHoveredLink={setHoveredLink}
                onClick={() => handleNavClick('/#contact')}
              />
            </div>

            {/* Mobile Right Section - CTA Button & Menu */}
            <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden flex-shrink-0">
              {/* Book Consultancy Button - Mobile */}
              <motion.button
                onClick={() => handleNavClick('/#contact')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-3 sm:px-3.5 py-1.5 sm:py-2 bg-white text-[#174A67] text-[10px] sm:text-xs font-semibold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 whitespace-nowrap flex items-center gap-1 sm:gap-1.5 overflow-hidden flex-shrink-0"
              >
                {/* Gradient border */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7DD3FC] via-[#45C0B0] to-[#3B82F6] opacity-100 -z-10" />
                <span className="absolute inset-[2px] rounded-full bg-white -z-[1]" />
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10 flex-shrink-0" />
                <span className="hidden xs:inline relative z-10">Book Now</span>
                <span className="xs:hidden relative z-10">Book</span>
              </motion.button>

              {/* Hamburger Menu Button - Transforms to X when menu is open */}
              <motion.button
                onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-gray-900 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 group"
                aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isSideMenuOpen}
              >
                {/* Animated background */}
                <motion.div 
                  className="absolute inset-0 bg-white border border-gray-200/80 shadow-sm rounded-xl sm:rounded-2xl"
                  animate={{
                    backgroundColor: isSideMenuOpen ? '#F9FAFB' : '#ffffff'
                  }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Custom Hamburger Icon - 3 lines that transform to X */}
                <div className="relative z-20 w-4 h-4 sm:w-5 sm:h-5 flex flex-col justify-center items-center">
                  <motion.span
                    className="absolute w-4 sm:w-5 h-0.5 rounded-full origin-center"
                    style={{ backgroundColor: '#111827' }}
                    animate={{
                      rotate: isSideMenuOpen ? 45 : 0,
                      y: isSideMenuOpen ? 0 : -5,
                      width: isSideMenuOpen ? '1.25rem' : '1rem',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
                  />
                  <motion.span
                    className="absolute w-4 sm:w-5 h-0.5 rounded-full origin-center"
                    style={{ backgroundColor: '#111827' }}
                    animate={{
                      opacity: isSideMenuOpen ? 0 : 1,
                      scale: isSideMenuOpen ? 0 : 1,
                      x: isSideMenuOpen ? 10 : 0,
                    }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.span
                    className="absolute w-4 sm:w-5 h-0.5 rounded-full origin-center"
                    style={{ backgroundColor: '#111827' }}
                    animate={{
                      rotate: isSideMenuOpen ? -45 : 0,
                      y: isSideMenuOpen ? 0 : 5,
                      width: isSideMenuOpen ? '1.25rem' : '1rem',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
                  />
                </div>
              </motion.button>
            </div>

            {/* Desktop Right Section - Hidden on Mobile */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
              {/* CTA Button - Desktop */}
              <motion.button
                onClick={() => handleNavClick('/#contact')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 xl:px-6 py-2 xl:py-2.5 bg-white text-[#174A67] font-semibold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 text-xs xl:text-sm overflow-hidden group whitespace-nowrap"
              >
                {/* Gradient border */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7DD3FC] via-[#45C0B0] to-[#3B82F6] opacity-100 -z-10" />
                <span className="absolute inset-[2px] rounded-full bg-white -z-[1]" />
                <span className="relative z-10 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="hidden xl:inline">Book Your Free Consultancy</span>
                  <span className="xl:hidden">Book Now</span>
                </span>
              </motion.button>

              {/* Desktop Menu Button - Transforms to X when menu is open */}
              <motion.button
                onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-11 h-11 xl:w-12 xl:h-12 flex items-center justify-center text-gray-900 rounded-2xl overflow-hidden group flex-shrink-0"
                aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isSideMenuOpen}
              >
                {/* Animated background */}
                <motion.div 
                  className="absolute inset-0 bg-white border border-gray-200/80 shadow-sm rounded-2xl"
                  animate={{
                    backgroundColor: isSideMenuOpen ? '#F9FAFB' : '#ffffff'
                  }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Custom Hamburger Icon - 3 lines that transform to X */}
                <div className="relative z-20 w-5 h-5 xl:w-6 xl:h-6 flex flex-col justify-center items-center">
                  <motion.span
                    className="absolute w-5 xl:w-6 h-0.5 rounded-full origin-center"
                    style={{ backgroundColor: '#111827' }}
                    animate={{
                      rotate: isSideMenuOpen ? 45 : 0,
                      y: isSideMenuOpen ? 0 : -6,
                      width: isSideMenuOpen ? '1.5rem' : '1.25rem',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
                  />
                  <motion.span
                    className="absolute w-5 xl:w-6 h-0.5 rounded-full origin-center"
                    style={{ backgroundColor: '#111827' }}
                    animate={{
                      opacity: isSideMenuOpen ? 0 : 1,
                      scale: isSideMenuOpen ? 0 : 1,
                      x: isSideMenuOpen ? 12 : 0,
                    }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.span
                    className="absolute w-5 xl:w-6 h-0.5 rounded-full origin-center"
                    style={{ backgroundColor: '#111827' }}
                    animate={{
                      rotate: isSideMenuOpen ? -45 : 0,
                      y: isSideMenuOpen ? 0 : 6,
                      width: isSideMenuOpen ? '1.5rem' : '1.25rem',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile & Desktop Dropdown Menu (Floating Card) */}
      <AnimatePresence>
        {isSideMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
            className="absolute top-full left-3 right-3 mt-2 lg:left-auto lg:w-[380px] xl:w-[420px] origin-top lg:origin-top-right shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-[28px]"
            style={{ zIndex: 100 }}
          >
            <div className="w-full bg-white/95 backdrop-blur-[40px] border border-gray-200/80 rounded-[28px] p-2 flex flex-col">
              <div className="flex flex-col space-y-1 p-2">
                {[
                  { id: 'home', label: navHome, path: '/', isActive: isHomeActive },
                  { id: 'about', label: navAbout, path: '/#about', isActive: isAboutActive },
                  { id: 'services', label: navServices, path: '/services', isActive: isServicesActive },
                  { id: 'blog', label: navBlog, path: '/blog', isActive: isBlogActive },
                  { id: 'contact', label: navContact, path: '/#contact', isActive: isContactActive },
                ].map((item, index) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05), type: "spring", stiffness: 300, damping: 24 }}
                    key={item.id}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      handleNavClick(item.path);
                      setIsSideMenuOpen(false);
                    }}
                    href={item.path}
                    className={`relative text-left py-3.5 px-4 font-bold text-[16px] rounded-xl transition-all !w-full !flex items-center justify-between group active:scale-[0.98] overflow-hidden cursor-pointer ${
                      item.isActive 
                        ? 'bg-[#F0F9FF] text-[#0ea5e9]' 
                        : 'text-gray-800 hover:bg-[#F0F9FF] hover:text-[#0ea5e9]'
                    }`}
                  >
                    {/* Active Bar */}
                    {item.isActive && (
                      <motion.div 
                        layoutId="activeMobileBar"
                        className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#0ea5e9] rounded-r-md"
                      />
                    )}
                    <span className="relative z-10 pl-1 flex-1">{item.label}</span>
                    <span className={`relative z-10 transition-opacity text-sm text-[#0ea5e9] shrink-0 ${item.isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>→</span>
                  </motion.a>
                ))}
              </div>

              {/* Let's Talk CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 24 }}
                className="mt-1 text-center pb-2 px-2"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleNavClick('/#contact');
                    setIsSideMenuOpen(false);
                  }}
                  className="!w-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-white py-4 rounded-[20px] text-[16px] font-bold !flex items-center justify-center gap-3 shadow-[0_4px_14px_rgba(14,165,233,0.3)] transition-all cursor-pointer"
                >
                  Get Free Quote
                  <div className="w-6 h-6 bg-white text-[#0ea5e9] rounded-full flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom Tags Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-3 pb-3 px-3 text-center border-t border-gray-100 pt-4"
              >
                <h3 className="text-gray-900 text-[13px] font-bold mb-3">Popular Services</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {['AC Repair', 'Plumbing', 'Painting', 'Renovation'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        handleNavClick('/services');
                        setIsSideMenuOpen(false);
                      }}
                      className="px-4 py-1.5 bg-gray-50 border border-gray-200 hover:border-[#0ea5e9] rounded-full text-gray-700 hover:text-[#0ea5e9] text-[12px] font-semibold transition-all shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
};

// Memoize Navbar to prevent unnecessary re-renders
export default memo(Navbar);
