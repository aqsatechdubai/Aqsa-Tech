"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';
;
import { useTranslatedServices } from '../hooks/useTranslatedServices';
import ProButton from '../components/ui/ProButton';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { generateWhatsAppUrl, WHATSAPP_PHONE } from '../utils/whatsapp';

const AllServices: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const ___router = useRouter();
  const navigate = (path: string | number) => { if (typeof path === "number" && path === -1) { ___router.back(); } else if (typeof path === "string") { ___router.push(path); } };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { services } = useTranslatedServices();
  const seoTitle = `All Services | Aqsa Tech | AQSATECH | aqsatech - Property Maintenance Services Dubai UAE`;
  const seoDescription = `Browse all property maintenance services by Aqsa Tech (AQSATECH, aqsatech) in Dubai UAE. Expert AC repair, plumbing, electrical, painting, tiling, carpentry, and more. 10+ professional services. Free quotes. Call +971 52 501 0132`;
  const seoKeywords = `aqsatech services, Aqsa Tech services, AQSATECH services, all services aqsatech, property maintenance services Dubai, renovation services Dubai, AC repair Dubai, plumbing Dubai, electrical services Dubai, painting Dubai, tiling Dubai, carpentry Dubai`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <StructuredData
        type="Service"
        data={{
          serviceType: 'Property Maintenance Services',
          name: 'All Property Maintenance Services',
          description: seoDescription,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Aqsa Tech - AQSATECH',
            url: 'https://aqsatech.ae',
          },
        }}
      />
      <div className="min-h-screen bg-soft-gray-light pt-20 sm:pt-24 overflow-x-hidden">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 overflow-x-hidden">
          <motion.button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors text-sm sm:text-base ${isRTL ? 'flex-row-reverse ml-auto' : ''}`}
            whileHover={{ x: isRTL ? 4 : -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="font-medium">{t('common.back')}</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <h1 className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4`}>
              {t('allServices.title')}
            </h1>
            <p className={`text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-900 max-w-3xl mx-auto font-medium`}>
              {t('allServices.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16 overflow-x-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8 w-full items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-50 flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"


                  className="w-full h-full object-cover object-center"
                  width={400}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ contentVisibility: 'auto' }}
                />
                
                {/* Tags over image */}
                <div className="absolute bottom-2 left-3 right-3 flex flex-wrap gap-1 sm:gap-1.5 justify-center">
                  {service.tags?.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="bg-white/95 backdrop-blur-sm text-gray-800 px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-[11px] font-medium shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className={`p-4 sm:p-5 lg:p-6 flex flex-col flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {service.title}
                </h3>
                <p className={`text-gray-900 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-5 line-clamp-3 flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
                  {service.description}
                </p>

                  <ProButton
                    onClick={() => navigate(`/services/${service.slug}`)}
                    size="md"
                    variant="dark"
                    fullWidth
                  >
                    {t('common.viewDetails')}
                  </ProButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 px-2 sm:px-0 text-gray-900">
              {t('allServices.needCustomService')}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-900 font-medium mb-6 sm:mb-8 px-2 sm:px-0">
              {t('allServices.customServiceDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
              <ProButton
                as="a"
                href={generateWhatsAppUrl(WHATSAPP_PHONE, t('whatsapp.allServicesQuote'))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Free Quote on WhatsApp"
                size="lg"
                variant="dark"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
              >
                {t('services.viewAll')}
              </ProButton>
              <ProButton
                as="a"
                href={generateWhatsAppUrl(WHATSAPP_PHONE, t('whatsapp.allServicesQuote'))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Us on WhatsApp"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white cursor-pointer transition-all duration-300 text-sm sm:text-base"
                leftIcon={<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                {t('allServices.contactUs')}
              </ProButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AllServices;
