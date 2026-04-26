"use client";
import {  useRouter , useParams } from 'next/navigation';
import { useEffect, useMemo, useCallback } from 'react';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Home, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import ProButton from '../components/ui/ProButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslatedBlogPosts } from '../hooks/useTranslatedBlogPosts';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { generateWhatsAppUrl, WHATSAPP_PHONE } from '../utils/whatsapp';

export default function BlogDetail() {
  const { t, isRTL } = useLanguage();
  const ___router = useRouter();
  const navigate = (path: string | number) => { if (typeof path === "number" && path === -1) { ___router.back(); } else if (typeof path === "string") { ___router.push(path); } };
  const { slug } = useParams<{ slug: string }>();
  const { translatedPosts } = useTranslatedBlogPosts();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [slug]);

  const post = useMemo(() => {
    const originalPost = blogPosts.find((p) => p.slug === slug);
    const translatedPost = translatedPosts.find((p) => p.slug === slug);
    return translatedPost || originalPost;
  }, [slug, translatedPosts]);
  
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return translatedPosts
      .filter((p) => p.slug !== slug && p.category === post.category)
      .slice(0, 3);
  }, [slug, post, translatedPosts]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || '',
          text: post?.excerpt || '',
          url: window.location.href,
        });
      } catch {
        // Share cancelled by user
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('common.linkCopied'));
    }
  }, [post, t]);

  if (!post) {
    return (
      <div className="min-h-screen bg-soft-gray-light pt-20 sm:pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t('common.articleNotFound')}</h1>
          <p className={`text-gray-900 mb-8 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{t('common.articleNotFoundDescription')}</p>
          <ProButton onClick={() => navigate('/blog')} variant="primary">
            {t('common.back')}
          </ProButton>
        </div>
      </div>
    );
  }

  const articleTitle = `${post.title} | Aqsa Tech Blog - Property Maintenance Tips UAE`;
  const articleDescription = post.excerpt || `${post.title} - Expert property maintenance tips and insights from Aqsa Tech United Arab Emirates.`;
  const articleKeywords = `${post.category}, property maintenance UAE, ${post.title}, Aqsa Tech blog, renovation tips UAE, home maintenance UAE`;

  return (
    <>
      <SEOHead
        title={articleTitle}
        description={articleDescription}
        keywords={articleKeywords}
        image={post.image}
        type="article"
      />
      <StructuredData
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          dateModified: post.date,
          url: `https://aqsatech.ae/blog/${post.slug}`,
        }}
      />
      <div className="min-h-screen bg-soft-gray-light pt-20 sm:pt-24">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="eager"
          decoding="async"


          width={1920}
          height={1080}
          sizes="100vw"
          className="w-full h-full object-cover"
          style={{ contentVisibility: 'auto' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 w-full">
            {/* Navigation */}
            <div className={`flex gap-2 sm:gap-3 mb-4 sm:mb-6 ${isRTL ? 'flex-row-reverse justify-end sm:justify-start' : 'justify-start'}`}>
              <motion.button
                onClick={() => navigate('/blog')}
                className={`flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                whileHover={{ x: isRTL ? 4 : -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'rotate-180' : ''}`} />
                <span className="font-medium">{t('common.back')}</span>
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium">{t('common.home')}</span>
              </motion.button>
            </div>

            {/* Title & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className={`text-center sm:text-left flex flex-col items-center sm:items-start gap-3`}
            >
              <div className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold border border-white/30 shadow-md">
                {post.category}
              </div>
              
              <h1 className={`text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white !leading-[1.1] sm:!leading-[1.15] m-0 p-0 tracking-tight drop-shadow-lg max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}>
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-white/80 justify-center sm:justify-start">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {post.readTime}
                </span>
                <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <User size={16} />
                  {post.author}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 xl:p-10">
              {/* Excerpt */}
              <p className={`text-base sm:text-lg lg:text-xl text-gray-700 font-medium mb-6 sm:mb-8 leading-relaxed ${isRTL ? 'border-r-4 pr-4 sm:pr-6 border-l-0 pl-0' : 'border-l-4 pl-4 sm:pl-6'} border-brand-teal ${isRTL ? 'text-right' : 'text-left'}`}>
                {post.excerpt}
              </p>

              {/* Content */}
              <div className={`prose prose-lg max-w-none ${isRTL ? 'text-right' : 'text-left'}`}>
                {post.content.split('\n\n').map((paragraph: string, index: number) => {
                  // Skip empty paragraphs
                  if (!paragraph.trim()) return null;
                  
                  // Check if paragraph is a heading (starts with # or is all caps with colon)
                  if (paragraph.match(/^#+\s/) || (paragraph.length < 100 && paragraph.match(/^[A-Z\s:]+$/) && paragraph.includes(':'))) {
                    const headingText = paragraph.replace(/^#+\s*/, '');
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {headingText}
                      </h2>
                    );
                  }
                  
                  // Check if paragraph is a numbered list item or subheading
                  if (paragraph.match(/^\d+\.\s/)) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                        {paragraph}
                      </h3>
                    );
                  }
                  
                  // Check if paragraph starts with bullet points or contains multiple bullet points
                  if (paragraph.includes('•') || paragraph.includes('✓') || paragraph.includes('✔')) {
                    const lines = paragraph.split('\n').filter(line => line.trim());
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 mb-6 ml-4">
                        {lines.map((line: string, i: number) => (
                          <li key={i} className="text-gray-700 leading-relaxed">
                            {line.replace(/^[•✓✔]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  
                  // Check if line contains bold text markers
                  if (paragraph.includes('**') || paragraph.includes('__')) {
                    const parts = paragraph.split(/(\*\*.*?\*\*|__.*?__)/g);
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed mb-6">
                        {parts.map((part, i) => {
                          if (part.match(/^\*\*.*\*\*$/) || part.match(/^__.*__$/)) {
                            return <strong key={i}>{part.replace(/[\*_]{2}/g, '')}</strong>;
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </p>
                    );
                  }
                  
                  // Regular paragraph
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Share Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={handleShare}
                  className={`flex items-center gap-2 text-gray-700 hover:text-brand-teal transition-colors font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Share2 size={20} />
                  <span className="font-medium">{t('common.share') || 'Share'}</span>
                </button>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-gray-900 rounded-2xl p-8 shadow-2xl border-2 border-gray-800"
              >
                <h3 className={`text-2xl font-bold mb-4 text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('blog.needProfessionalHelp')}
                </h3>
                <p className={`text-gray-100 text-base mb-6 font-normal leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('blog.professionalHelpDescription')}
                </p>
                <div className="space-y-3">
                  <ProButton
                    as="a"
                    href={generateWhatsAppUrl(WHATSAPP_PHONE, t('whatsapp.blogQuote'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get Free Quote on WhatsApp"
                    variant="outline"
                    size="md"
                    fullWidth
                    className="bg-green-600 hover:bg-green-700 text-white border-0 font-bold shadow-lg"
                  >
                    {t('hero.getFreeQuote')}
                  </ProButton>
                  <ProButton
                    as="a"
                    href="tel:+971525010132"
                    variant="outline"
                    size="md"
                    fullWidth
                    className="border-2 border-gray-300 bg-white text-gray-900 hover:bg-gray-100 font-bold"
                  >
                    {t('hero.callNow')}
                  </ProButton>
                </div>
              </motion.div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
                >
                  <h3 className={`text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left ${isRTL ? 'sm:text-right' : ''}`}>{t('blog.relatedArticles') || 'Related Articles'}</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <article
                        key={relatedPost.id}
                        onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                        className="group cursor-pointer"
                      >
                        <div className={`flex gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            loading="lazy"
                            decoding="async"
                            width={80}
                            height={80}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <h4 className={`font-semibold text-gray-900 group-hover:text-brand-teal transition-colors line-clamp-2 text-xs sm:text-sm mb-1`}>
                              {relatedPost.title}
                            </h4>
                            <p className={`text-xs text-gray-700`}>
                              {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <ProButton
                    onClick={() => navigate('/blog')}
                    variant="dark"
                    size="sm"
                    fullWidth
                    className="mt-4 sm:mt-6 text-xs sm:text-sm"
                  >
                    {t('blog.viewAllArticles') || 'View All Articles'}
                  </ProButton>
                </motion.div>
              )}

              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.09, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-800 p-8"
              >
                <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                    {post.author.charAt(0)}
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className={`font-bold text-white text-xl ${isRTL ? 'text-right' : 'text-left'}`}>{post.author}</h4>
                    <p className={`text-base text-gray-300 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{t('blog.expertWriter')}</p>
                  </div>
                </div>
                <p className={`text-base text-gray-100 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('blog.authorDescription')}
                </p>
              </motion.div>
            </div>
          </aside>
        </div>
      </section>

      {/* More Articles CTA */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 border-t-4 border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              {t('blog.exploreMore')}
            </h2>
            <p className="text-xl text-gray-100 mb-10 font-normal leading-relaxed">
              {t('blog.exploreMoreDescription')}
            </p>
            <ProButton
              onClick={() => navigate('/blog')}
              variant="dark"
              size="lg"
              className="px-8 py-4"
            >
              {t('common.back')}
            </ProButton>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
