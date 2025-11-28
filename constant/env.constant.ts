import { EnvField } from '@/enum';

export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const;

const NODE_ENV = process.env[EnvField.NEXT_PUBLIC_NODE_ENV] || ENVIRONMENT.DEVELOPMENT;
const IS_PRODUCTION = NODE_ENV === ENVIRONMENT.PRODUCTION;

export const ENV_CONFIG = {
  environment: NODE_ENV,
  isProduction: IS_PRODUCTION,
} as const;
