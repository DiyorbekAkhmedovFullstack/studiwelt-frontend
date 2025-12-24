import { useState, useEffect, useRef } from 'react';

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean; // For above-the-fold images
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

/**
 * OptimizedImage component with:
 * - WebP support with PNG fallback
 * - Native lazy loading
 * - Blur placeholder while loading
 * - IntersectionObserver for better performance
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Convert .png to .webp for modern browsers
  const webpSrc = src.replace(/\.png$/, '.webp');

  useEffect(() => {
    // Skip IntersectionObserver for priority images (isInView already initialized with priority)
    if (priority) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Try PNG fallback if WebP fails
    if (e.currentTarget.src.endsWith('.webp')) {
      e.currentTarget.src = src;
    } else if (onError) {
      onError(e);
    }
  };

  return (
    <div ref={imgRef} className="relative w-full h-full">
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Actual image */}
      {isInView && (
        <picture>
          {/* WebP source for modern browsers */}
          <source srcSet={webpSrc} type="image/webp" />

          {/* PNG fallback for older browsers */}
          <img
            src={src}
            alt={alt}
            className={`${className} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
}
