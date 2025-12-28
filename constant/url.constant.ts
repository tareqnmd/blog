import { EnvField } from '@/enum';

const DEFAULT_SITE = 'https://blog.tareqnmd.com';
export const BASE_URL = process.env[EnvField.NEXT_PUBLIC_BASE_URL] || DEFAULT_SITE;
