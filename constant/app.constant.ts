import { EnvField } from '@/enum';

const APP_AUTHOR = process.env[EnvField.NEXT_PUBLIC_APP_AUTHOR] || 'Md Tareq';
const APP_AUTHOR_USERNAME = 'tareqnmd';
const APP_AUTHOR_HANDLE = '@tareqnmd';
const APP_NAME = process.env[EnvField.NEXT_PUBLIC_APP_NAME] || 'Blog';
const APP_TAGLINE = 'Ideas worth sharing';
const APP_DESCRIPTION =
  process.env[EnvField.NEXT_PUBLIC_APP_DESCRIPTION] ||
  `Welcome to ${APP_NAME}. Discover insights, tips, and latest updates from ${APP_AUTHOR}.`;
const APP_THEME_COLOR = process.env[EnvField.NEXT_PUBLIC_APP_THEME_COLOR] || '#020817';
const APP_VERSION = process.env[EnvField.NEXT_PUBLIC_APP_VERSION] || '1.0.0';
const APP_AUTHOR_URL = 'https://tareqnmd.com';
const APP_AUTHOR_IMAGE = '/images/meta/author.webp';

export const APP_CONFIG = {
  name: APP_NAME,
  tagline: APP_TAGLINE,
  description: APP_DESCRIPTION,
  themeColor: APP_THEME_COLOR,
  version: APP_VERSION,
  author: APP_AUTHOR,
  authorUrl: APP_AUTHOR_URL,
  authorImage: APP_AUTHOR_IMAGE,
  authorUsername: APP_AUTHOR_USERNAME,
  authorHandle: APP_AUTHOR_HANDLE,
} as const;
