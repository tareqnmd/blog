const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-';
const GOOGLE_VERIFICATION_CODE = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || '';

export const ANALYTICS_CONFIG = {
  ga4Id: GA4_ID,
  googleVerificationCode: GOOGLE_VERIFICATION_CODE,
} as const;
