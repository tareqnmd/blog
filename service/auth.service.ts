import { ApiPath } from '@/enum';
import { axiosInstance } from '@/lib/axios-instance.lib';

export const authService = {
  googleLogin: async (token: string) => {
    const response = await axiosInstance.post(ApiPath.GOOGLE_LOGIN, {
      token,
    });
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await axiosInstance.post(ApiPath.REFRESH_TOKEN, {
      refreshToken,
    });
    return response.data;
  },
};
