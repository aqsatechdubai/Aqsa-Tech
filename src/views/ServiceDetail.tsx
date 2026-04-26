"use client";
import {  useRouter , useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslatedServices } from '../hooks/useTranslatedServices';
import { ArrowLeft, Phone, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import ProButton from '../components/ui/ProButton';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { generateWhatsAppUrl, WHATSAPP_PHONE } from '../utils/whatsapp';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const ___router = useRouter();
  const navigate = (path: string | number) => { if (typeof path === "number" && path === -1) { ___router.back(); } else if (typeof path === "string") { ___router.push(path); } };
  const { t, isRTL } = useLanguage();
  const { services: translated } = useTranslatedServices();
  const service = translated.find((s) => s.slug === slug);

  // Get service-specific Why Choose Us reasons or fallback to generic
  const getWhyChooseUs = () => {
    if (!service) return null;
    
    const titleKey = `serviceWhyChoose.${service.slug}.title`;
    const title = t(titleKey);
    
    // Check if service-specific translation exists
    if (title && title !== titleKey) {
      const reasons = [];
      for (let i = 0; i < 6; i++) {
        const reasonKey = `serviceWhyChoose.${service.slug}.reasons.${i}`;
        const reason = t(reasonKey);
        if (reason && reason !== reasonKey) {
          reasons.push(reason);
        }
      }
      
      if (reasons.length > 0) {
        return { title, reasons };
      }
    }
    
    // Fallback to generic reasons
    return {
      title: t('services.whyChooseUs'),
      reasons: [
        t('services.whyChooseItem1'),
        t('services.whyChooseItem2'),
        t('services.whyChooseItem3'),
        t('services.whyChooseItem4'),
        t('services.whyChooseItem5'),
      ],
    };
  };

  const whyChooseUs = getWhyChooseUs();

  // Get service-specific Benefits or fallback to generic
  const getServiceBenefits = () => {
    if (!service) return null;
    
    const benefitsKey = `serviceWhyChoose.${service.slug}.benefits.0`;
    const firstBenefit = t(benefitsKey);
    
    // Check if service-specific benefits exist
    if (firstBenefit && firstBenefit !== benefitsKey) {
      const benefits = [];
      for (let i = 0; i < 6; i++) {
        const benefitKey = `serviceWhyChoose.${service.slug}.benefits.${i}`;
        const benefit = t(benefitKey);
        if (benefit && benefit !== benefitKey) {
          benefits.push(benefit);
        }
      }
      
      if (benefits.length > 0) {
        return benefits;
      }
    }
    
    // Fallback to service.benefits from data
    return service.benefits || [];
  };

  const serviceBenefits = getServiceBenefits();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!service) {
    return (
      <div className="pt-24 px-4 max-w-5xl mx-auto">
        <div className={`rounded-xl border border-red-200 bg-red-50 p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-xl font-semibold text-red-700 mb-2">{t('services.notFound')}</h2>
          <p className="text-sm text-red-600 mb-4">{t('services.notFoundDescription')}</p>
          <button
            onClick={() => navigate('/services')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft size={16} /> {t('services.backToServices')}
          </button>
        </div>
      </div>
    );
  }

  const serviceTitle = `${service.title} | Aqsa Tech - Professional ${service.title} Services in United Arab Emirates`;
  const serviceDescription = `${service.description} Professional ${service.title} services in United Arab Emirates by Aqsa Tech. Expert installation, repair & maintenance. Free quotes. Call +971 52 501 0132`;
  const serviceKeywords = `${service.title} UAE, ${service.title} services UAE, Aqsa Tech ${service.title}, professional ${service.title} UAE, ${service.tags.join(', ')}, property maintenance UAE`;

  return (
    <>
      <SEOHead
        title={serviceTitle}
        description={serviceDescription}
        keywords={serviceKeywords}
        image={service.image}
        type="article"
      />
      <StructuredData
        type="Service"
        data={{
          serviceType: service.title,
          name: service.title,
          description: service.description,
          image: service.image,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Aqsa Tech - AQSATECH',
            url: 'https://aqsatech.ae',
          },
        }}
      />
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16">
      {/* Hero Section - Card Layout */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 max-w-6xl mx-auto mb-6 sm:mb-8 lg:mb-12">
        {/* Navigation Buttons */}
        <div className={`mb-3 sm:mb-4 md:mb-6 flex gap-2 sm:gap-3 flex-wrap ${isRTL ? 'justify-end' : 'justify-start'}`}>
          <ProButton
            onClick={() => navigate(-1)}
            size="sm"
            variant="secondary"
            leftIcon={<ArrowLeft className={`${isRTL ? 'rotate-180' : ''}`} size={12} />}
            className="bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 text-xs px-2 sm:px-3 py-1 sm:py-1.5 shadow-sm"
          >
            {t('common.back')}
          </ProButton>
          <ProButton
            onClick={() => navigate('/')}
            size="sm"
            variant="secondary"
            leftIcon={<Home size={12} />}
            className="bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 text-xs px-2 sm:px-3 py-1 sm:py-1.5 shadow-sm"
          >
            {t('common.home')}
          </ProButton>
        </div>

        {/* Hero Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-gray-200 overflow-hidden w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left - Photo */}
            <div className={`relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10] lg:aspect-auto lg:h-auto lg:min-h-[450px] overflow-hidden ${isRTL ? 'lg:order-2' : ''}`}>
              <img
                src={service.image}
                alt={service.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ 
                  contentVisibility: 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              />
              {/* Gradient overlay for better text readability on image */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent lg:hidden pointer-events-none" />
            </div>

            {/* Right - Content */}
            <div className={`p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col justify-center min-h-0 ${isRTL ? 'lg:order-1' : ''}`}>
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {service.title}
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className={`text-gray-700 text-sm sm:text-base lg:text-lg xl:text-xl font-medium mb-4 sm:mb-5 lg:mb-6 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {service.description}
              </motion.p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className={`flex flex-wrap gap-2 sm:gap-2.5 lg:gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}
              >
                {service.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 sm:px-3.5 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-full text-xs sm:text-sm lg:text-base font-semibold bg-gray-900 text-white border-2 border-gray-900 shadow-lg whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 max-w-6xl mx-auto mt-6 sm:mt-8 lg:mt-12 grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {/* Overview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="md:col-span-2"
        >
          <h2 className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>{t('services.overview')}</h2>
          <p className={`text-gray-700 leading-relaxed mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>
            {service.longDescription}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 bg-white shadow-sm">
              <h3 className={`text-sm sm:text-base font-bold mb-3 sm:mb-4 text-gray-900 text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>{t('services.keyFeatures')}</h3>
              <ul className={`space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {service.features?.map((f: string) => (
                  <li key={f} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="mt-1.5 inline-block w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="text-gray-900">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 bg-white shadow-sm">
              <h3 className={`text-sm sm:text-base font-bold mb-3 sm:mb-4 text-gray-900 text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>{t('services.benefits')}</h3>
              <ul className={`space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                {serviceBenefits && serviceBenefits.map((b: string, index: number) => (
                  <li key={index} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="mt-1.5 inline-block w-2 h-2 rounded-full bg-green-600 flex-shrink-0" />
                    <span className="text-gray-900">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {service.gallery && (
            <div className="mb-8 sm:mb-10">
              <h3 className={`text-sm sm:text-base font-bold mb-3 text-gray-900 text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>{t('services.gallery')}</h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {service.gallery?.map((g: string) => (
                  <div key={g} className="relative w-full aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                  <img
                    src={g}
                    loading="lazy"
                    decoding="async"
                    alt={service.title + ' work sample'}
                      className="w-full h-full object-cover object-center"
                      style={{ minWidth: '100%', minHeight: '100%' }}
                  />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          transition={{ duration: 0.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
          className="md:col-span-1"
        >
          <div className="sticky top-20 sm:top-24 lg:top-28 space-y-4 sm:space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white p-4 sm:p-5 lg:p-6 shadow-lg">
              <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-white text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>{t('services.needThisService')}</h3>
              <p className={`text-xs sm:text-sm text-white leading-relaxed mb-3 sm:mb-4 text-center sm:text-left font-medium ${isRTL ? 'sm:text-right' : ''}`}>
                {t('services.serviceDescription')}
              </p>
              <ProButton
                as="a"
                href={generateWhatsAppUrl(WHATSAPP_PHONE, t('whatsapp.serviceQuote', { serviceName: service.title }))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Request a Quote on WhatsApp"
                size="md"
                variant="primary"
                fullWidth
                className="text-sm sm:text-base"
              >
                {t('services.requestQuote')}
              </ProButton>
              <ProButton
                as="a"
                href="tel:+971525010132"
                size="md"
                variant="outline"
                fullWidth
                leftIcon={<Phone size={14} />}
                className="mt-2 sm:mt-3 border-white text-white hover:bg-white hover:text-blue-600 text-sm sm:text-base"
              >
                {t('hero.callNow')}
              </ProButton>
            </div>
            {whyChooseUs && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6 shadow-sm">
                <h4 className={`text-xs sm:text-sm lg:text-base font-bold mb-3 sm:mb-4 text-gray-900 text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>
                  {whyChooseUs.title}
                </h4>
                <ul className={`space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {whyChooseUs.reasons.map((reason, index) => (
                    <li key={index} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`w-2 h-2 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0 ${isRTL ? 'order-2' : ''}`} />
                      <span className="text-gray-900">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
