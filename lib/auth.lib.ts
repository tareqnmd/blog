import { FORCED_REFRESH_QUERY_PARAM } from '@/constant';
import { AccountAuthType, AccountField, EnvField, Routes, SessionField } from '@/enum';
import { authService } from '@/service/auth.service';
import { ISessionUser } from '@/types';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const config = (query?: { [key: string]: string | string[] }): NextAuthConfig => {
  return {
    providers: [
      Google({
        clientId: process.env[EnvField.GOOGLE_CLIENT_ID],
        clientSecret: process.env[EnvField.GOOGLE_CLIENT_SECRET],
        authorization: {
          params: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      }),
    ],
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const { pathname } = nextUrl;
        const isPublicRoute = !pathname.includes(Routes.ADMIN);
        if (isPublicRoute) {
          return true;
        }
        return !!isLoggedIn;
      },

      async signIn({ user, account }) {
        if (!account) {
          return false;
        }

        const isFromSocialAuth = account[AccountField.PROVIDER] === AccountAuthType.GOOGLE;
        if (isFromSocialAuth) {
          try {
            const token = account[AccountField.ID_TOKEN];

            if (!token) {
              return false;
            }
            const response = await authService.googleLogin(token);
            if (response?.data) {
              Object.assign(user, response?.data);
              return true;
            }
            return false;
          } catch {
            return false;
          }
        }

        return true;
      },

      async jwt({ token, user, trigger, session }) {
        if (user) {
          token[SessionField.USER] = user as ISessionUser;
        }
        if (trigger === 'update') {
          token[SessionField.USER] = {
            ...token[SessionField.USER],
            ...session,
          } as ISessionUser;
        }
        const forceRefresh = query?.[FORCED_REFRESH_QUERY_PARAM] === 'true';
        const accessTokenExpiryTime = token?.user?.token?.accessTokenExpiresIn;
        const isAccessTokenExpired =
          accessTokenExpiryTime && new Date(accessTokenExpiryTime).getTime() < new Date().getTime();

        if (!isAccessTokenExpired || !forceRefresh) {
          return token;
        }

        if (token?.user?.token?.refreshToken && token?.user?.token?.accessToken) {
          const refreshTokenResponse = await authService.refreshToken(
            token?.user?.token?.refreshToken
          );
          if (refreshTokenResponse?.status === 201 && refreshTokenResponse?.data?.accessToken) {
            token.user.token.accessToken = refreshTokenResponse.data.accessToken;
            token.user.token.refreshToken = refreshTokenResponse.data.refreshToken;
            token.user.token.accessTokenExpiresIn = refreshTokenResponse.data.accessTokenExpiresIn;
            token.user.token.refreshTokenExpiresIn =
              refreshTokenResponse.data.refreshTokenExpiresIn;
          } else {
            token.user = {} as ISessionUser;
          }
        }
        return token;
      },

      session({ session, token }) {
        if (token[SessionField.USER]) {
          session[SessionField.USER] = token[SessionField.USER];
        }
        return session;
      },

      async redirect({ url, baseUrl }) {
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
  };
};

export const { handlers, signIn, signOut, auth } = NextAuth(config());
