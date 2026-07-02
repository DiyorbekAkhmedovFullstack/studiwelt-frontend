import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Testimonial = { text: string; role: string };

export interface RandomTestimonial {
  text?: string;
  role?: string;
  avatar: string;
}

/**
 * Picks a random localized testimonial once per mount (stable across
 * re-renders, fresh on each page visit). Shared by the login and register
 * pages. Testimonials live under the `testimonials` key of the `auth` i18n
 * namespace.
 *
 * The avatar is fixed per testimonial: the seed is derived from the
 * testimonial's index, so a given comment always shows the same avatar
 * (and stays consistent across languages, since the index is parallel).
 */
export function useRandomTestimonial(): RandomTestimonial {
  const { t } = useTranslation('auth');

  const testimonials = t('testimonials', { returnObjects: true }) as Testimonial[];
  const count = Array.isArray(testimonials) ? testimonials.length : 0;

  const [index] = useState(() => (count > 0 ? Math.floor(Math.random() * count) : 0));

  const testimonial = Array.isArray(testimonials)
    ? testimonials[index] ?? testimonials[0]
    : undefined;

  return {
    text: testimonial?.text,
    role: testimonial?.role,
    avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=testimonial-${index}`,
  };
}
