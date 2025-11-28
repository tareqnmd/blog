import { EnvField } from '@/enum';

const DEFAULT_SITE = 'https://academy.tareq.com';
export const BASE_URL = process.env[EnvField.NEXT_PUBLIC_BASE_URL] || DEFAULT_SITE;
