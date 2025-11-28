import { EnvField } from '@/enum';

const APP_NAME = process.env[EnvField.NEXT_PUBLIC_APP_NAME] || 'Academy';
const APP_DESCRIPTION = process.env[EnvField.NEXT_PUBLIC_APP_DESCRIPTION] || 'Academy by Tareq';
const APP_THEME_COLOR = process.env[EnvField.NEXT_PUBLIC_APP_THEME_COLOR] || '#020817';
const APP_VERSION = process.env[EnvField.NEXT_PUBLIC_APP_VERSION] || '1.0.0';
const APP_AUTHOR = process.env[EnvField.NEXT_PUBLIC_APP_AUTHOR] || 'Tareq';

export const APP_CONFIG = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  themeColor: APP_THEME_COLOR,
  version: APP_VERSION,
  author: APP_AUTHOR,
} as const;
