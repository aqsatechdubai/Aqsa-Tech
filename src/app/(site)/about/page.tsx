import type { Metadata } from 'next';
import About from '@/components/About';
import GetInTouch from '@/components/GetInTouch';

export const metadata: Metadata = {
  title: 'About Us | Aqsa Tech UAE - #1 Technical Services Company Dubai',
  description: 'Learn about Aqsa Tech, Dubai\'s most trusted technical services company since 2020. Expert AC, plumbing, painting and home maintenance services across UAE.',
  openGraph: {
    title: 'About Us | Aqsa Tech UAE',
    description: 'Learn about Aqsa Tech, Dubai\'s most trusted technical services company since 2020.',
    url: 'https://aqsatech.ae/about',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <About />
      <GetInTouch />
    </div>
  );
}
