"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useRef, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
;
import { useTranslatedServices } from '../hooks/useTranslatedServices';
import ProButton from './ui/ProButton';
import { gpuAccelerate, optimizeImage } from '../utils/performance';

interface Service {
  id: number;
  title: string;
  price: string;
  image: string;
  tags: string[];
}

const DiscoverPopularServices: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const ___router = useRouter();
  const navigate = (path: string | number) => { if (typeof path === "number" && path === -1) { ___router.back(); } else if (typeof path === "string") { ___router.push(path); } };
  const { services: allServices } = useTranslatedServices();
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(280);
  const [gap, setGap] = useState(12);

  const AUTO_INTERVAL = 2000; // smoother auto advance (ms)

  // Memoize services array to prevent recreation on every render
  const services: Service[] = useMemo(() => [
    {
      id: 1,
      title: 'Wall Paper Fixing',
      price: '$45',
      image: '/Services Stock images/wallpaper fixing.png',
      tags: ['Wallpaper', 'Installation', 'Decor'],
    },
    {
      id: 2,
      title: 'Floor & Wall Tiling',
      price: '$50',
      image: '/Services Stock images/floor and wall tiling.png',
      tags: ['Tiling', 'Flooring', 'Installation'],
    },
    {
      id: 3,
      title: 'Plaster Works',
      price: '$42',
      image: '/Services Stock images/plaster works.png',
      tags: ['Plastering', 'Walls', 'Finishing'],
    },
    {
      id: 4,
      title: 'Carpentry & Flooring',
      price: '$48',
      image: '/Services Stock images/Carpentry & flooring contracting.png',
      tags: ['Carpentry', 'Flooring', 'Wood Work'],
    },
    {
      id: 5,
      title: 'Engraving & Ornamentation',
      price: '$55',
      image: '/Services Stock images/Engraving & Ornamentation Works.png',
      tags: ['Engraving', 'Decoration', 'Ornamental'],
    },
    {
      id: 6,
      title: 'Painting Contracting',
      price: '$40',
      image: '/Services Stock images/Painting contracting.png',
      tags: ['Painting', 'Interior', 'Exterior'],
    },
    {
      id: 7,
      title: 'AC Installation',
      price: '$55',
      image: '/Services Stock images/Air-coditioning installation.png',
      tags: ['AC Install', 'Installation', 'HVAC'],
    },
    {
      id: 8,
      title: 'AC Maintenance',
      price: '$45',
      image: '/Services Stock images/Air-coditioning maintenance.png',
      tags: ['AC Maintenance', 'Servicing', 'Repair'],
    },
    {
      id: 9,
      title: 'Ventilation & Air Filtration',
      price: '$52',
      image: '/Services Stock images/Ventilation & air-filtration system installation.png',
      tags: ['Ventilation', 'Air Filters', 'HVAC'],
    },
    {
      id: 10,
      title: 'Electromechanical Equipment',
      price: '$55',
      image: '/Services Stock images/Electromechanical equipment installation & maintenance.png',
      tags: ['Installation', 'Maintenance', 'Equipment'],
    },
    {
      id: 11,
      title: 'False Ceiling & Partitions',
      price: '$46',
      image: '/Services Stock images/False ceiling & light-partition installation.png',
      tags: ['False Ceiling', 'Partitions', 'Interior'],
    },
    {
      id: 12,
      title: 'Plumbing & Sanitary',
      price: '$45',
      image: '/Services Stock images/Plumbing & sanitary contracting.png',
      tags: ['Plumbing', 'Sanitary', 'Installation'],
    },
    {
      id: 13,
      title: 'Office Fit Out',
      price: '$60',
      image: '/Services Stock images/Office Fit Out Services.png',
      tags: ['Office', 'Fit Out', 'Interior Design'],
    },
    {
      id: 14,
      title: 'Water Tank Cleaning',
      price: '$50',
      image: '/Services Stock images/Water Tank Cleaning & Maintenance.png',
      tags: ['Water Tank', 'Cleaning', 'Maintenance'],
    },
    {
      id: 15,
      title: 'Kitchen Renovation',
      price: '$65',
      image: '/Services Stock images/Kitchen Renovation.png',
      tags: ['Kitchen', 'Renovation', 'Design'],
    },
    {
      id: 16,
      title: 'Renovation & Remodeling',
      price: '$70',
      image: '/Services Stock images/Renovation & Remodeling.png',
      tags: ['Renovation', 'Remodeling', 'Interior Design'],
    },
    {
      id: 17,
      title: 'AC Dust Cleaning',
      price: '$46',
      image: '/Services Stock images/AC Dust Cleaning.png',
      tags: ['AC Dust Cleaning', 'Deep Cleaning', 'Air Quality'],
    },
    {
      id: 18,
      title: 'AC Coil Cleaning',
      price: '$48',
      image: '/Services Stock images/AC Coil Cleaning.png',
      tags: ['AC Coil Cleaning', 'Performance', 'Energy Saving'],
    },
  ], []);

  // Memoize service lookup functions to prevent recreation
  const getServiceDescription = useCallback((serviceId: number) => {
    const fullService = allServices.find(s => s.id === serviceId);
    return fullService?.description || '';
  }, [allServices]);

  const getServiceTitle = useCallback((serviceId: number) => {
    const fullService = allServices.find(s => s.id === serviceId);
    return fullService?.title || '';
  }, [allServices]);

  const getServiceSlug = useCallback((serviceId: number) => {
    const fullService = allServices.find(s => s.id === serviceId);
    return fullService?.slug || '';
  }, [allServices]);

  // For continuous running ribbon feel, duplicate the array multiple times
  const ribbonServices = useMemo(() => [...services, ...services, ...services, ...services], [services, allServices]);

  // Measure actual card width and gap from DOM - Optimized for 144Hz
  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current && containerRef.current) {
        const cardElement = cardRef.current;
        const containerElement = containerRef.current;
        const cardWidthValue = cardElement.offsetWidth;
        const containerStyle = window.getComputedStyle(containerElement);
        const gapValue = parseFloat(containerStyle.gap) || 12;
        setCardWidth(cardWidthValue);
        setGap(gapValue);
      }
    };

    // Initial measurement after render - use RAF for smoother updates
    requestAnimationFrame(() => {
      setTimeout(updateDimensions, 100);
    });

    // Throttle resize for 144Hz
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 16); // ~60fps for resize
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateDimensions);
    });

    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
      gpuAccelerate(cardRef.current);
    }
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      gpuAccelerate(containerRef.current);
    }

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  // Auto-scroll - Direction depends on RTL
  const [isPaused, setIsPaused] = useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      // In RTL, move left to right (decrease index), in LTR move right to left (increase index)
      setCurrentIndex((prev) => isRTL ? (prev - 1 + services.length) % services.length : (prev + 1) % services.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, services.length, isRTL]);

  // Only pause on desktop hover, not on mobile touch
  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section
      className="w-full bg-white py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto w-full overflow-x-hidden">
        {/* Header */}
        <div className={`mb-6 sm:mb-8 lg:mb-10 xl:mb-12 text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-200 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue" />
            <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold tracking-[0.18em] uppercase text-gray-700">
              {t('discoverServices.title')}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.2, delay: 0.03, ease: [0.25, 0.1, 0.25, 1] }}
            className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}
          >
            {t('discoverServices.subtitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className={`text-gray-600 text-xs sm:text-sm lg:text-base xl:text-lg max-w-3xl ${isRTL ? 'sm:mr-auto sm:ml-0' : 'mx-auto'} ${isRTL ? 'sm:text-right' : 'text-center sm:text-left'}`}
          >
            {t('discoverServices.subtitle')}
          </motion.p>
        </div>

        {/* Continuous Ribbon Container - Same animation for all devices */}
        <div className="relative mb-8 sm:mb-10 lg:mb-12 w-full overflow-hidden">
          <div className="overflow-hidden w-full">
            <motion.div
              ref={containerRef}
              className={`flex gap-3 sm:gap-4 lg:gap-5 items-stretch ${isRTL ? 'flex-row-reverse' : ''}`}
              style={{
                x: isRTL
                  ? `${(currentIndex % services.length) * (cardWidth + gap)}px`
                  : `-${(currentIndex % services.length) * (cardWidth + gap)}px`,
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
              animate={{
                x: isRTL
                  ? `${(currentIndex % services.length) * (cardWidth + gap)}px`
                  : `-${(currentIndex % services.length) * (cardWidth + gap)}px`
              }}
              transition={{
                ease: 'linear',
                duration: AUTO_INTERVAL / 1000,
                type: 'tween' as const
              }}
            >
              {ribbonServices.map((service, idx) => (
                <div
                  key={service.id + '-' + idx}
                  ref={idx === 0 ? cardRef : null}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px]"
                >
                  <div
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-200 w-full h-full flex flex-col"
                    style={{
                      transform: 'translateZ(0)',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Image Section - 144Hz Optimized */}
                    <div className="relative h-56 sm:h-60 md:h-64 lg:h-72 overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        ref={(img) => {
                          if (img) optimizeImage(img);
                        }}
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={300}
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, (max-width: 1024px) 320px, 360px"
                        className="w-full h-full object-cover object-center"
                        style={{
                          contentVisibility: 'auto',
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden',
                          willChange: 'transform'
                        }}
                      />

                      {/* Tags on Image */}
                      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 sm:gap-1.5 justify-center">
                        {service.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-white/95 backdrop-blur-sm text-gray-800 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium shadow-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`p-4 sm:p-5 lg:p-6 flex flex-col flex-1 min-h-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h3 className={`text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {getServiceTitle(service.id) || service.title}
                      </h3>
                      <p className={`text-gray-900 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 flex-1 line-clamp-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {getServiceDescription(service.id)}
                      </p>

                      <div className="mt-auto">
                        <ProButton
                          onClick={() => {
                            const slug = getServiceSlug(service.id);
                            if (slug) navigate(`/services/${slug}`);
                          }}
                          size="md"
                          variant="dark"
                          fullWidth
                          className="text-xs sm:text-sm"
                        >
                          {t('common.viewDetails')}
                        </ProButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows - Shown on all devices */}
        <div className={`flex justify-center items-center gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <motion.button
            suppressHydrationWarning
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRTL ? handleNext : handlePrev}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:bg-gray-100`}
            aria-label={isRTL ? "Next" : "Previous"}
          >
            {isRTL ? (
              <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-800`} />
            ) : (
              <ChevronLeft className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-800`} />
            )}
          </motion.button>

          <motion.button
            suppressHydrationWarning
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRTL ? handlePrev : handleNext}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:bg-gray-100`}
            aria-label={isRTL ? "Previous" : "Next"}
          >
            {isRTL ? (
              <ChevronLeft className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-800`} />
            ) : (
              <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-800`} />
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(DiscoverPopularServices);
