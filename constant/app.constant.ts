import { EnvField } from '@/enum';

const APP_AUTHOR = process.env[EnvField.NEXT_PUBLIC_APP_AUTHOR] || 'Tareq';
const APP_NAME = process.env[EnvField.NEXT_PUBLIC_APP_NAME] || 'Blog';
const APP_DESCRIPTION =
  process.env[EnvField.NEXT_PUBLIC_APP_DESCRIPTION] ||
  `Welcome to ${APP_NAME}. Discover insights, tips, and latest updates from ${APP_AUTHOR}.`;
const APP_THEME_COLOR = process.env[EnvField.NEXT_PUBLIC_APP_THEME_COLOR] || '#020817';
const APP_VERSION = process.env[EnvField.NEXT_PUBLIC_APP_VERSION] || '1.0.0';

export const APP_CONFIG = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  themeColor: APP_THEME_COLOR,
  version: APP_VERSION,
  author: APP_AUTHOR,
} as const;
