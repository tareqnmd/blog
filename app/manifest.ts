import { APP_CONFIG } from '@/constant';
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_CONFIG.name,
    short_name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: APP_CONFIG.themeColor,
    theme_color: APP_CONFIG.themeColor,
    icons: [
      {
        src: '/images/meta/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/meta/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/meta/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/images/meta/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/images/meta/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
    ],
  };
}
