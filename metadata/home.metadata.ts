import { APP_CONFIG, BASE_URL } from '@/constant';
import { Metadata } from 'next';

export const homeMetadata: Metadata = {
  title: `Home - ${APP_CONFIG.name}`,
  description: APP_CONFIG.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `Home - ${APP_CONFIG.name}`,
    description: APP_CONFIG.description,
    url: BASE_URL,
    type: 'website',
    images: ['/images/meta/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Home - ${APP_CONFIG.name}`,
    description: APP_CONFIG.description,
    images: ['/images/meta/og-image.png'],
  },
};
