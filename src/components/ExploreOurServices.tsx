"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
;
import ProButton from './ui/ProButton';
import {
  Wrench,
  Package,
  UserCheck,
  Paintbrush,
  Star,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { optimizeImage } from '../utils/performance';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface ServiceTag {
  name: string;
}

const ExploreOurServices: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('building');
  const [isCatOpen, setIsCatOpen] = useState(false);
  const ___router = useRouter();
  const navigate = (path: string | number) => { if (typeof path === "number" && path === -1) { ___router.back(); } else if (typeof path === "string") { ___router.push(path); } };
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsCatOpen(false);
      }
    };

    if (isCatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isCatOpen]);

  const categories: Category[] = React.useMemo(() => [
    { id: 'building', name: t('exploreServices.buildingMaintenance'), icon: <Wrench className="w-6 h-6" /> },
    { id: 'property', name: t('exploreServices.propertyMaintenance'), icon: <UserCheck className="w-6 h-6" /> },
    { id: 'renovation', name: t('exploreServices.renovation'), icon: <Wrench className="w-6 h-6" /> },
    { id: 'mep', name: t('exploreServices.mep'), icon: <Package className="w-6 h-6" /> },
    { id: 'hvac', name: t('exploreServices.hvac'), icon: <Star className="w-6 h-6" /> },
    { id: 'painting', name: t('exploreServices.painting'), icon: <Paintbrush className="w-6 h-6" /> },
  ], [t]);

  const categoryContent: Record<string, { title: string; description: string; image: string; tags: ServiceTag[] }> = React.useMemo(() => ({
    building: {
      title: t('exploreServices.buildingTitle'),
      description: t('exploreServices.buildingDescription'),
      image: '/images/photos/explore-building.jpg',
      tags: [
        { name: t('exploreServices.buildingTag1') },
        { name: t('exploreServices.buildingTag2') },
        { name: t('exploreServices.buildingTag3') },
        { name: t('exploreServices.buildingTag4') },
        { name: t('exploreServices.buildingTag5') },
      ],
    },
    property: {
      title: t('exploreServices.propertyTitle'),
      description: t('exploreServices.propertyDescription'),
      image: '/Services Stock images/Property Management.png',
      tags: [
        { name: t('exploreServices.propertyTag1') },
        { name: t('exploreServices.propertyTag2') },
        { name: t('exploreServices.propertyTag3') },
        { name: t('exploreServices.propertyTag4') },
        { name: t('exploreServices.propertyTag5') },
      ],
    },
    renovation: {
      title: t('exploreServices.renovationTitle'),
      description: t('exploreServices.renovationDescription'),
      image: '/images/photos/explore-renovation.jpg',
      tags: [
        { name: t('exploreServices.renovationTag1') },
        { name: t('exploreServices.renovationTag2') },
        { name: t('exploreServices.renovationTag3') },
        { name: t('exploreServices.renovationTag4') },
        { name: t('exploreServices.renovationTag5') },
      ],
    },
    mep: {
      title: t('exploreServices.mepTitle'),
      description: t('exploreServices.mepDescription'),
      image: '/Services Stock images/Plumbing and electrical.png',
      tags: [
        { name: t('exploreServices.mepTag1') },
        { name: t('exploreServices.mepTag2') },
        { name: t('exploreServices.mepTag3') },
        { name: t('exploreServices.mepTag4') },
        { name: t('exploreServices.mepTag5') },
      ],
    },
    hvac: {
      title: t('exploreServices.hvacTitle'),
      description: t('exploreServices.hvacDescription'),
      image: '/Services Stock images/HVAC & AC Service.png',
      tags: [
        { name: t('exploreServices.hvacTag1') },
        { name: t('exploreServices.hvacTag2') },
        { name: t('exploreServices.hvacTag3') },
        { name: t('exploreServices.hvacTag4') },
        { name: t('exploreServices.hvacTag5') },
      ],
    },
    painting: {
      title: t('exploreServices.paintingTitle'),
      description: t('exploreServices.paintingDescription'),
      image: '/Services Stock images/Painting and Decor 2.png',
      tags: [
        { name: t('exploreServices.paintingTag1') },
        { name: t('exploreServices.paintingTag2') },
        { name: t('exploreServices.paintingTag3') },
        { name: t('exploreServices.paintingTag4') },
        { name: t('exploreServices.paintingTag5') },
      ],
    },
  }), [t]);

  // Tasker list and animations removed per request

  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row ${isRTL ? 'sm:flex-row-reverse' : ''} justify-between items-start sm:items-center mb-6 sm:mb-8 lg:mb-12 gap-4 sm:gap-0`}>
          <div className="w-full sm:w-auto">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2 sm:mb-3 text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>
              {t('exploreServices.title')}
            </h2>
            <p className={`text-gray-900 text-sm sm:text-base lg:text-lg text-center sm:text-left font-medium ${isRTL ? 'sm:text-right' : ''}`}>
              {t('exploreServices.subtitle')}
            </p>
          </div>
          <ProButton
            onClick={() => navigate('/services')}
            variant="dark"
            size="md"
            className="w-full sm:w-auto"
          >
            {t('exploreServices.viewAllServices')}
          </ProButton>
        </div>

        {/* Category selector - mobile dropdown */}
        <div className="sm:hidden mb-6 relative z-30" ref={dropdownRef}>
          {/* Backdrop */}
          <AnimatePresence>
            {isCatOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/30 z-40"
                onClick={() => setIsCatOpen(false)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setIsCatOpen(false);
                }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          <motion.button suppressHydrationWarning ref={buttonRef}
            type="button"
            aria-expanded={isCatOpen}
            aria-haspopup="listbox"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsCatOpen((v) => !v);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            className={`w-full justify-between flex items-center bg-white border-2 ${isCatOpen ? 'border-brand-teal shadow-lg' : 'border-gray-200'} text-gray-900 px-4 py-4 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md touch-manipulation ${isRTL ? 'flex-row-reverse' : ''}`}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`flex items-center gap-3 flex-1 min-w-0 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <span className={`flex items-center flex-shrink-0 ${isRTL ? 'order-2 ml-2' : 'mr-0'}`}>
                {categories.find((c) => c.id === activeCategory)?.icon}
              </span>
              <span className={`text-sm font-semibold truncate text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                {categories.find((c) => c.id === activeCategory)?.name || t('exploreServices.selectCategory')}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${isCatOpen ? 'rotate-180 text-brand-teal' : ''} ${isRTL ? 'mr-0' : 'ml-2'}`}
            />
          </motion.button>

          <AnimatePresence>
            {isCatOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-[60vh] overflow-y-auto overscroll-contain"
                role="listbox"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                {categories.map((category) => {
                  const active = activeCategory === category.id;
                  return (
                    <button suppressHydrationWarning key={category.id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveCategory(category.id);
                        setIsCatOpen(false);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                      }}
                      className={`w-full ${isRTL ? 'text-right flex-row-reverse' : 'text-left'} px-4 py-4 flex items-center gap-3 transition-all duration-200 touch-manipulation ${active
                        ? 'bg-brand-teal/10 text-brand-teal font-bold border-l-4 border-brand-teal'
                        : 'text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                        } ${isRTL ? 'border-r-4 border-l-0' : ''}`}
                    >
                      <span className={`flex items-center flex-shrink-0 w-6 h-6 ${active ? 'text-brand-teal' : 'text-gray-700'}`}>
                        {category.icon}
                      </span>
                      <span className={`text-sm font-semibold flex-1 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {category.name}
                      </span>
                      {active && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-brand-teal flex-shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Category Tabs - desktop/tablet */}
        <div className={`hidden sm:flex gap-6 lg:gap-8 mb-8 overflow-x-auto pb-4 scrollbar-hide border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {categories.map((category) => (
            <motion.button suppressHydrationWarning key={category.id}
              whileHover={{ y: -2 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center gap-2 min-w-fit transition-all duration-300 ${activeCategory === category.id
                ? 'text-brand-teal'
                : 'text-gray-900 hover:text-brand-blue'
                }`}
            >
              <div
                className={`transition-colors duration-300 ${activeCategory === category.id ? 'text-brand-teal' : 'text-gray-700'
                  }`}
              >
                {category.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap text-gray-900">
                {category.name}
              </span>
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="h-0.5 w-full bg-brand-blue"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12 w-full"
          >
            {/* Image Section */}
            <div className={`relative h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[500px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg group ${isRTL ? 'lg:order-2' : ''}`}>
              <img
                ref={(img) => {
                  if (img) optimizeImage(img);
                }}
                src={categoryContent[activeCategory]?.image || '/images/photos/explore-property.jpg'}
                alt={categoryContent[activeCategory]?.title || 'Property Maintenance'}
                loading="lazy"
                decoding="async"
                width={800}
                height={800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{
                  contentVisibility: 'auto',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/photos/explore-property.jpg';
                }}
              />
              {/* Overlay gradient for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            {/* Details Section */}
            <div className={`flex flex-col justify-center text-center sm:text-left ${isRTL ? 'lg:order-1 sm:text-right' : ''} px-2 sm:px-0 w-full`}>
              <div className="w-full">
                <h3 className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal text-gray-900 mb-3 sm:mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {categoryContent[activeCategory]?.title}
                </h3>
                <p className={`text-xs sm:text-sm lg:text-base xl:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-5 lg:mb-6 xl:mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {categoryContent[activeCategory]?.description}
                </p>

                {/* Service Tags */}
                <div className={`flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 justify-center ${isRTL ? 'sm:justify-end' : 'sm:justify-start'} overflow-visible`}>
                  {categoryContent[activeCategory]?.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white hover:bg-brand-blue text-gray-900 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border-2 border-gray-300 hover:border-brand-blue/60 shadow-sm hover:shadow-md relative z-10 overflow-visible whitespace-nowrap"
                      style={{
                        color: '#1F2937',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.backgroundColor = '#174A67';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#1F2937';
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Removed "View All Taskers" button per request */}
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Removed Taskers Grid per request */}
      </div>
    </section>
  );
};

export default React.memo(ExploreOurServices);
