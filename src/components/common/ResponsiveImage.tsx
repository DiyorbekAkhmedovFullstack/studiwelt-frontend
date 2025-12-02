import { type ImgHTMLAttributes } from 'react';

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  src: string;
  alt: string;
  /**
   * Array of image sources with their widths
   * Example: [
   *   { src: 'image-480.jpg', width: 480 },
   *   { src: 'image-800.jpg', width: 800 },
   *   { src: 'image-1200.jpg', width: 1200 }
   * ]
   */
  sources?: Array<{ src: string; width: number }>;
  /**
   * Sizes attribute for responsive images
   * Example: "(max-width: 768px) 100vw, 50vw"
   * Default: "100vw"
   */
  sizes?: string;
  /**
   * Enable lazy loading (default: true for images below fold)
   */
  loading?: 'lazy' | 'eager';
  /**
   * Aspect ratio to prevent layout shift
   * Example: "16/9" or "1/1"
   */
  aspectRatio?: string;
}

/**
 * ResponsiveImage component with srcset support
 * Optimized for different screen sizes and Retina displays
 *
 * @example
 * ```tsx
 * <ResponsiveImage
 *   src="/images/hero-800.jpg"
 *   alt="Hero image"
 *   sources={[
 *     { src: '/images/hero-480.jpg', width: 480 },
 *     { src: '/images/hero-800.jpg', width: 800 },
 *     { src: '/images/hero-1200.jpg', width: 1200 },
 *   ]}
 *   sizes="(max-width: 768px) 100vw, 800px"
 *   loading="lazy"
 * />
 * ```
 */
export function ResponsiveImage({
  src,
  alt,
  sources,
  sizes = '100vw',
  loading = 'lazy',
  aspectRatio,
  className = '',
  style,
  ...props
}: ResponsiveImageProps) {
  // Generate srcset string from sources array
  const srcSet = sources
    ? sources.map(({ src, width }) => `${src} ${width}w`).join(', ')
    : undefined;

  // Combine aspect ratio with existing styles
  const combinedStyle = aspectRatio
    ? { aspectRatio, objectFit: 'cover' as const, ...style }
    : style;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      className={`max-w-full h-auto ${className}`.trim()}
      style={combinedStyle}
      {...props}
    />
  );
}

/**
 * Picture component for art direction
 * Use when you need different images for different screen sizes
 *
 * @example
 * ```tsx
 * <Picture
 *   sources={[
 *     { media: '(min-width: 1280px)', srcSet: '/hero-desktop.jpg' },
 *     { media: '(min-width: 768px)', srcSet: '/hero-tablet.jpg' },
 *   ]}
 *   src="/hero-mobile.jpg"
 *   alt="Hero image"
 * />
 * ```
 */
interface PictureProps {
  sources: Array<{
    media?: string;
    srcSet: string;
    type?: string;
  }>;
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function Picture({
  sources,
  src,
  alt,
  className = '',
  loading = 'lazy',
}: PictureProps) {
  return (
    <picture>
      {sources.map((source, index) => (
        <source
          key={index}
          media={source.media}
          srcSet={source.srcSet}
          type={source.type}
        />
      ))}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`max-w-full h-auto ${className}`.trim()}
      />
    </picture>
  );
}
