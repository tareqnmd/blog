import { SessionField, SessionHeader, TokenField } from '@/enum';
import { QueryKeys } from '@/enum/query-keys.enum';
import { auth, isServerSide, signOut as serverSignOut } from '@/lib';
import { ISessionUser } from '@/types';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { cache } from 'react';

export const getSessionFromNextServer = async (queryParamString?: string) => {
  const response = await axios.get(
    '/api/auth/session' + (queryParamString ? '?' + queryParamString : '')
  );
  return response.data;
};

export async function fetchSessionHeader(
  queryParamString?: string
): Promise<{ [key: string]: string }> {
  try {
    const session = await getSessionFromNextServer(queryParamString);
    return {
      [SessionHeader.AUTHORIZATION]: `Bearer ${
        session?.user?.[SessionField.TOKEN][TokenField.ACCESS_TOKEN]
      }`,
    };
  } catch {
    return {
      [SessionHeader.AUTHORIZATION]: '',
    };
  }
}

export const signOutHandler = async () => {
  if (isServerSide()) {
    await serverSignOut();
  } else {
    await signOut();
  }
};

export const getReactQueryClientWithSession = cache(async () => {
  let session: ISessionUser | null = null;
  const queryClient = new QueryClient();
  const initialNetworkCalls = [];
  initialNetworkCalls.push(
    queryClient.prefetchQuery({
      queryKey: [QueryKeys.SESSION],
      queryFn: async () => {
        const sessionRes = await auth();
        session = JSON.parse(JSON.stringify(sessionRes));
        return session;
      },
    })
  );

  await Promise.all(initialNetworkCalls);
  return { queryClient, session: session as ISessionUser | null };
});

export const getHeaderFromSession = async () => {
  try {
    let session = null;
    if (isServerSide()) {
      session = await auth();
    } else {
      session = await getSession();
    }
    if (!session?.user?.[SessionField.TOKEN][TokenField.ACCESS_TOKEN]) {
      throw new Error('No access token');
    }
    return {
      [SessionHeader.AUTHORIZATION]: `Bearer ${
        session?.user?.[SessionField.TOKEN][TokenField.ACCESS_TOKEN]
      }`,
    };
  } catch {
    return {
      [SessionHeader.AUTHORIZATION]: '',
    };
  }
};
