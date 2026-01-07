import { APP_CONFIG, BASE_URL } from '@/constant';
import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
  description: APP_CONFIG.description,
  authors: [{ name: APP_CONFIG.author, url: APP_CONFIG.authorUrl }],
  metadataBase: new URL(BASE_URL),
  creator: APP_CONFIG.authorHandle,
  publisher: APP_CONFIG.author,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    siteName: APP_CONFIG.name,
    images: ['/images/meta/og-image.png'],
    authors: [APP_CONFIG.authorUrl, APP_CONFIG.authorHandle],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: ['/images/meta/og-image.png'],
    creator: APP_CONFIG.authorHandle,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  other: {
    'author:image': APP_CONFIG.authorImage,
    'author:url': APP_CONFIG.authorUrl,
    'author:name': APP_CONFIG.author,
    'author:username': APP_CONFIG.authorUsername,
  },
};
