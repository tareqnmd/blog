import { config } from '@/lib';
import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';

const handler = async (req: NextRequest) => {
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams);
  const { handlers } = NextAuth(config(searchParams));
  return req.method === 'GET' ? handlers.GET(req) : handlers.POST(req);
};

export { handler as GET, handler as POST };
