"use client";
import ProButton from './ui/ProButton';
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { optimizeImage } from '../utils/performance';

const About: React.FC = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section id="about" className="w-full bg-white py-10 sm:py-14 lg:py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg border border-gray-200 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[420px] w-full">
            {/* Left - Photo (stays in the left corner) */}
            <div className={`relative h-56 sm:h-64 md:h-72 lg:h-auto ${isRTL ? 'lg:order-2' : ''} w-full`}>
              <img
                ref={(img) => {
                  if (img) optimizeImage(img);
                }}
                src="/images/photos/about-main.jpg"
                alt="Aqsatech in Dubai - Modern UAE residential building exterior - Aqsa Tech property maintenance and renovation services Dubai"
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ 
                  contentVisibility: 'auto',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}
              />
              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              {/* decorative small building image in corner */}
              <img
                src="/images/photos/about-detail.jpg"
                alt="Aqsatech in Dubai - UAE modern architecture detail - Aqsa Tech renovation services Dubai"
                loading="lazy"
                decoding="async"


                width={96}
                height={64}
                sizes="96px"
                className={`absolute ${isRTL ? 'right-4' : 'left-4'} bottom-4 w-24 h-16 object-cover rounded-md shadow-md hidden sm:block`}
                style={{ contentVisibility: 'auto' }}
              />
            </div>

            {/* Right - Content */}
            <div className={`p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col justify-center ${isRTL ? 'lg:order-1' : ''} text-center sm:text-left w-full`}>
              <motion.h4
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] sm:text-xs lg:text-sm font-semibold tracking-[0.16em] uppercase mb-2 sm:mb-3 bg-soft-gray-light text-brand-blue shadow-sm ${isRTL ? 'self-end sm:text-right' : 'self-start sm:text-left'}`}
              >
                {t('about.whyChoose')}
              </motion.h4>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 ${isRTL ? 'sm:text-right' : ''}`}
              >
                {t('about.heading')}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className={`text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto sm:mx-0 ${isRTL ? 'sm:text-right' : ''}`}
              >
                {t('about.descriptionText')}
              </motion.p>

              <div className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3 lg:gap-4 justify-center ${isRTL ? 'sm:justify-end' : 'sm:justify-start'}`}>
                <ProButton as="a" href="#contact" variant="dark" size="md" className="w-full sm:w-auto text-sm sm:text-base">{t('about.moreAboutUs')}</ProButton>
                <ProButton as="a" href="tel:+971525010132" variant="secondary" size="md" className="w-full sm:w-auto text-sm sm:text-base">{t('about.call')} (+971) 52 501 0132</ProButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
