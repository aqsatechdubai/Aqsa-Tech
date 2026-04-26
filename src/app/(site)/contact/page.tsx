import type { Metadata } from 'next';
import GetInTouch from '@/components/GetInTouch';

export const metadata: Metadata = {
  title: 'Contact Us | Aqsa Tech UAE - Get Free Quote',
  description: 'Contact Aqsa Tech Dubai for all home maintenance, AC repair, plumbing and technical services. Get a FREE quote today. Call +971 52 501 0132.',
  openGraph: {
    title: 'Contact Us | Aqsa Tech UAE',
    description: 'Contact Aqsa Tech Dubai for all home maintenance services. Get a FREE quote today.',
    url: 'https://aqsatech.ae/contact',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <GetInTouch />
    </div>
  );
}
