import { APP_CONFIG, BASE_URL } from '@/constant';
import { Routes } from '@/enum';
import { Metadata } from 'next';

const blogsTitle = `Blogs - ${APP_CONFIG.name}`;
const blogsDescription = `Explore blogs on ${APP_CONFIG.name}. Discover insights, tips, and latest updates from ${APP_CONFIG.author}.`;

export const blogsMetadata: Metadata = {
  title: 'Blogs',
  description: blogsDescription,
  alternates: {
    canonical: Routes.BLOGS,
  },
  openGraph: {
    title: blogsTitle,
    description: blogsDescription,
    url: `${BASE_URL}${Routes.BLOGS}`,
    type: 'website',
    images: ['/images/meta/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: blogsTitle,
    description: blogsDescription,
    images: ['/images/meta/og-image.png'],
  },
};
