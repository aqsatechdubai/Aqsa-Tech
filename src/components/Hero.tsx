"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ProButton from './ui/ProButton';
import { useLanguage } from '../contexts/LanguageContext';
import TextType from './TextType';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  // Scroll-based zoom animation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to scale value for professional zoom effect
  // Zoom in slightly as we scroll down (1.1 -> 1.3) for cinematic effect
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  useEffect(() => {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              setShouldLoadVideo(true);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden pt-24 sm:pt-20">
        {/* Hero Background Video with Professional Zoom Animation */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <motion.div
            style={{ 
              scale: prefersReducedMotion ? 1 : videoScale,
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            className="w-full h-full"
          >
            {shouldLoadVideo ? (
              <video
                ref={videoRef}
                src="/Hero Clip.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/Logo Chatgpt.png"
                className="w-full h-full object-cover"
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: prefersReducedMotion ? 'auto' : 'transform',
                  isolation: 'isolate',
                  contain: 'layout style paint',
                  opacity: isVideoLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                aria-label="Aqsatech in Dubai - Aqsa Tech UAE Property Maintenance Services Hero Video"
                onLoadedData={() => {
                  setIsVideoLoaded(true);
                  if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                  }
                }}
              />
            ) : (
              <Image 
                src="/Logo Chatgpt.png" 
                alt="Aqsa Tech Dubai" 
                fill
                priority
                className="object-cover"
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            )}
          </motion.div>
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-black/40" />
        
        {/* Overlay to cover watermark in bottom area */}
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 md:h-64 lg:h-72 z-0 bg-gradient-to-t from-black via-black/98 to-transparent pointer-events-none" />

        {/* Hero Content - No zoom, stays fixed */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto w-full text-center overflow-hidden px-2 sm:px-0">
            {/* Trustpilot Badge */}
            <motion.div 
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-4 sm:mb-8 mt-0 px-2"
            >
              <motion.span 
                className="text-white text-xs sm:text-sm font-semibold"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {t('hero.excellent')}
              </motion.span>
              <div className="flex gap-1" aria-label="5 star rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.svg
                    key={star}
                    className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 drop-shadow-sm"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-hidden="true"
                    initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0 : 0.15, 
                      delay: prefersReducedMotion ? 0 : 0.1 + (star * 0.03),
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </motion.svg>
                ))}
              </div>
              <motion.span 
                className="text-white text-xs sm:text-sm"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {t('hero.trustpilot')}
              </motion.span>
            </motion.div>

            {/* Typing Animation Heading */}
            <HeroTypingHeading prefersReducedMotion={prefersReducedMotion} />

            {/* Main CTAs - Professional Company Style */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto w-full px-2 sm:px-0 mt-4 sm:mt-6"
            >
              {/* Primary CTA - Request Quote */}
              <ProButton
                as="a"
                href="#get-in-touch"
                aria-label="Get FREE Quote"
                variant="dark"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('get-in-touch');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {t('hero.getFreeQuote')}
              </ProButton>

              {/* Secondary CTA - Call Now */}
              <ProButton
                as="a"
                href="tel:+971525010132"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 py-3 sm:py-4 border-white text-white hover:bg-white/10 hover:text-white backdrop-blur-sm text-sm sm:text-base text-center justify-center"
              >
                {t('hero.callNow')}
              </ProButton>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bottom Text Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="bg-soft-gray-light px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-20"
      >
        <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-6xl mx-auto text-center px-3 sm:px-0">
          {t('hero.description').split(/(\{seamless\}|\{userFriendly\}|\{simpleBooking\})/).map((part, i) => {
            if (part === '{seamless}') return <span key={i} className="font-bold text-brand-teal">{t('hero.seamless')}</span>;
            if (part === '{userFriendly}') return <span key={i} className="font-bold text-brand-blue">{t('hero.userFriendly')}</span>;
            if (part === '{simpleBooking}') return <span key={i} className="font-bold text-brand-teal">{t('hero.simpleBooking')}</span>;
            return <React.Fragment key={i}>{part}</React.Fragment>;
          })}
        </p>
      </motion.section>
    </div>
  );
};

export default React.memo(HeroSection);

// Local component to render the hero headline and subheadline.
const HeroTypingHeading: React.FC<{ prefersReducedMotion?: boolean }> = React.memo(({ prefersReducedMotion = false }) => {
  const { t } = useLanguage();
  const line1 = t('hero.heading1');
  const line2 = t('hero.heading2');
  const sub = t('hero.subheading');

  return (
    <div className="flex flex-col items-center justify-center w-full mt-0 sm:mt-2 md:mt-0">
      <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] font-bold text-center leading-[1.1] sm:leading-[1.05] md:leading-[0.95] mb-3 sm:mb-4 md:mb-5 px-2 sm:px-4 w-full">
        {/* Line 1 */}
        {prefersReducedMotion ? (
          <h1 className="text-white text-center w-full mb-1 sm:mb-0 break-words">
            {line1}
          </h1>
        ) : (
          <h1 className="text-white text-center w-full mb-1 sm:mb-0 break-words">
            <TextType
              text={line1}
              typingSpeed={40}
              initialDelay={200}
              showCursor={false}
              className="text-white"
            />
          </h1>
        )}
        
        {/* Line 2 */}
        {prefersReducedMotion ? (
          <h1 className="text-white text-center w-full break-words">
            {line2}
          </h1>
        ) : (
          <h1 className="text-white text-center w-full break-words">
            <TextType
              text={line2}
              typingSpeed={40}
              initialDelay={line1.length * 40 + 600}
              showCursor={false}
              className="text-white"
            />
          </h1>
        )}
      </div>
      
      <motion.p 
        className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-8 xl:mb-10 px-3 sm:px-4 md:px-6 font-medium leading-relaxed"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 0.2, 
          delay: prefersReducedMotion ? 0 : 0.15,
          ease: "easeOut"
        }}
      >
        {sub}
      </motion.p>
    </div>
  );
});
