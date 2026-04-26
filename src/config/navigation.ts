export interface NavItem {
  id: string;
  translationKey: 'nav.home' | 'nav.about' | 'nav.services' | 'nav.blog' | 'nav.contact';
  path: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'home', translationKey: 'nav.home', path: '/' },
  { id: 'about', translationKey: 'nav.about', path: '/#about' },
  // Note: Services is often handled uniquely on desktop (with a dropdown), but uses standard rendering on mobile.
  { id: 'services', translationKey: 'nav.services', path: '/services' },
  { id: 'blog', translationKey: 'nav.blog', path: '/blog' },
  { id: 'contact', translationKey: 'nav.contact', path: '/#contact' },
];

export const COMPANY_NAV_ITEMS = [
  { id: 'company-about', label: 'About', path: '/#about' },
  { id: 'company-career', label: 'Career', path: '/#contact' },
  { id: 'company-news', label: 'News', path: '/blog' },
  { id: 'company-sustainability', label: 'Sustainability', path: '/#about' },
];
