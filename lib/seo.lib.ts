import { APP_CONFIG, BASE_URL } from '@/constant';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: BASE_URL,
    logo: `${BASE_URL}/images/shared/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@beejoyi.com',
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/competitions?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
