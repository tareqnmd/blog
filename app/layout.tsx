import AppLayout from '@/components/layouts/AppLayout';
import StructuredData from '@/components/StructuredData';
import { APP_CONFIG, BASE_URL } from '@/constant';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib';
import Analytics from '@/modules/analytics/components/Analytics';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const font = Poppins({
  variable: '--font',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.name,
    template: `%s - ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  authors: [{ name: APP_CONFIG.author, url: 'https://tareqnmd.com' }],
  metadataBase: new URL(BASE_URL),
  creator: APP_CONFIG.author,
  publisher: APP_CONFIG.author,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: ['/images/meta/og-image.png'],
    authors: ['Tareq'],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: ['/images/meta/og-image.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={[organizationSchema, websiteSchema]} />
        <Analytics />
      </head>
      <body className={`${font.variable} antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
