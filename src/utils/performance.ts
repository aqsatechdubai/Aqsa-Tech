// Performance monitoring and optimization utilities

/**
 * Throttle function to limit function execution frequency (144Hz optimized)
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 7 // ~144fps default
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const now = performance.now();
    const timeSinceLastCall = now - lastCall;
    if (timeSinceLastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = performance.now();
        func.apply(this, args);
      }, limit - timeSinceLastCall);
    }
  };
}

/**
 * Debounce function to delay function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

/**
 * RequestAnimationFrame wrapper optimized for 144Hz
 */
export function raf144Hz(callback: () => void): number {
  return requestAnimationFrame(() => {
    requestAnimationFrame(callback); // Double RAF for smoother updates
  });
}

/**
 * GPU-accelerated transform helper
 */
export function gpuAccelerate(element: HTMLElement | null): void {
  if (!element) return;
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.willChange = 'transform, opacity';
}

/**
 * Optimize image loading
 */
export function optimizeImage(img: HTMLImageElement): void {
  img.loading = 'lazy';
  img.decoding = 'async';
  img.style.contentVisibility = 'auto';
  gpuAccelerate(img);
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImage(img: HTMLImageElement): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imgTarget = entry.target as HTMLImageElement;
          if (imgTarget.dataset.src) {
            imgTarget.src = imgTarget.dataset.src;
            imgTarget.removeAttribute('data-src');
          }
          optimizeImage(imgTarget);
          observer.unobserve(imgTarget);
        }
      });
    });
    imageObserver.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
}

/**
 * Measure Core Web Vitals
 */
export function measurePerformance(): void {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry && (lastEntry.renderTime || lastEntry.loadTime) > 2500) {
          console.warn('LCP is slow:', lastEntry.renderTime || lastEntry.loadTime, 'ms');
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Ignore unsupported
    }
  }
}

/**
 * Optimize scroll performance with requestAnimationFrame
 */
export function optimizedScroll(callback: () => void): () => void {
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}
