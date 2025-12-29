import { APP_CONFIG, BASE_URL } from '@/constant';
import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  authors: [{ name: APP_CONFIG.author, url: 'https://tareqnmd.com' }],
  metadataBase: new URL(BASE_URL),
  creator: APP_CONFIG.author,
  publisher: APP_CONFIG.author,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: ['/images/meta/og-image.png'],
    authors: ['Tareq'],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: ['/images/meta/og-image.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};
