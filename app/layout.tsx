import AppLayout from '@/components/layouts/AppLayout';
import StructuredData from '@/components/StructuredData';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib';
import { defaultMetadata } from '@/metadata';
import Analytics from '@/modules/analytics/components/Analytics';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Fira_Code, Sora } from 'next/font/google';

const font = Sora({
  variable: '--font',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  style: ['normal'],
});

const codeFont = Fira_Code({
  variable: '--font-code',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
});

export const metadata: Metadata = defaultMetadata;

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
      <body className={`${font.variable} ${codeFont.variable} antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
