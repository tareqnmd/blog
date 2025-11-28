export const SOCIAL_USERNAME = {
  facebookUsername: process.env.NEXT_PUBLIC_FACEBOOK || 'tareqnmd',
  twitterUsername: process.env.NEXT_PUBLIC_TWITTER || 'tareqnmd',
  linkedinUsername: process.env.NEXT_PUBLIC_LINKEDIN || 'tareqnmd',
  instagramUsername: process.env.NEXT_PUBLIC_INSTAGRAM || 'tareqnmd',
  youtubeUsername: process.env.NEXT_PUBLIC_YOUTUBE || '@tareqnmd',
} as const;

export const SOCIAL_URL = {
  facebookUrl: `https://facebook.com/${SOCIAL_USERNAME.facebookUsername}`,
  twitterUrl: `https://x.com/${SOCIAL_USERNAME.twitterUsername}`,
  linkedinUrl: `https://linkedin.com/in/${SOCIAL_USERNAME.linkedinUsername}`,
  instagramUrl: `https://instagram.com/${SOCIAL_USERNAME.instagramUsername}`,
  youtubeUrl: `https://youtube.com/${SOCIAL_USERNAME.youtubeUsername}`,
} as const;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

export const SOCIAL_CONFIG = {
  googleClientId: GOOGLE_CLIENT_ID,
  googleClientSecret: GOOGLE_CLIENT_SECRET,
} as const;
