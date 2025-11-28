import { useAccessTokenStore } from '@/components/layouts/AccessTokenCheck';
import { FORCED_REFRESH_QUERY_PARAM } from '@/constant';
import { SessionHeader } from '@/enum';
import axios from 'axios';
import { isServerSide } from './common.lib';
import { fetchSessionHeader, getHeaderFromSession, signOutHandler } from './session.lib';

let isRefreshing = false;
let refreshPromise: Promise<{ [key: string]: string }> | null = null;

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      const headers = config.headers;
      const exitsHeader = headers?.[SessionHeader.AUTHORIZATION];
      if (!exitsHeader) {
        const session = await getHeaderFromSession();
        if (session?.[SessionHeader.AUTHORIZATION]) {
          config.headers[SessionHeader.AUTHORIZATION] = session[SessionHeader.AUTHORIZATION];
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (isServerSide()) {
      return Promise.reject(error);
    } else if (error?.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing && refreshPromise) {
        return refreshPromise.then((newSession) => {
          originalRequest.headers[SessionHeader.AUTHORIZATION] =
            newSession[SessionHeader.AUTHORIZATION];
          return axiosInstance(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      refreshPromise = new Promise(async (resolve, reject) => {
        try {
          const newSession = await fetchSessionHeader(`${FORCED_REFRESH_QUERY_PARAM}=true`);
          if (newSession[SessionHeader.AUTHORIZATION]) {
            useAccessTokenStore.setState(newSession[SessionHeader.AUTHORIZATION]);
            resolve(newSession);
          } else {
            throw new Error('Failed to refresh token');
          }
        } catch (e) {
          reject(e);
        }
      });

      return refreshPromise
        .then((newSession) => {
          originalRequest.headers[SessionHeader.AUTHORIZATION] =
            newSession[SessionHeader.AUTHORIZATION];
          isRefreshing = false;
          refreshPromise = null;
          return axiosInstance(originalRequest);
        })
        .catch(async (err) => {
          isRefreshing = false;
          refreshPromise = null;
          await signOutHandler();
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);
