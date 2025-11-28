import { ApiPath } from '@/enum';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { BlogField } from '@/modules/blogs/blog.enum';
import { IBlogFormData } from '@/modules/blogs/blog.type';

export const blogService = {
  getBlogs: async (params: URLSearchParams) => {
    const response = await axiosInstance.get(ApiPath.BLOGS, {
      params,
    });
    return response.data;
  },

  getBlogBySlug: async (slug: string) => {
    const response = await axiosInstance.get(`${ApiPath.BLOGS}?slug=${slug}`);
    return response.data;
  },

  getBlog: async (id: string) => {
    const response = await axiosInstance.get(`${ApiPath.BLOGS}/${id}`);
    return response.data;
  },

  create: async (data: IBlogFormData) => {
    const payload = {
      ...data,
      [BlogField.IS_FEATURED]: data[BlogField.IS_FEATURED] ? 'true' : 'false',
    };
    const response = await axiosInstance.post(ApiPath.BLOGS, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: string, data: IBlogFormData) => {
    const payload = {
      ...data,
      [BlogField.IS_FEATURED]: data[BlogField.IS_FEATURED] ? 'true' : 'false',
    };
    const response = await axiosInstance.put(`${ApiPath.BLOGS}/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`${ApiPath.BLOGS}/${id}`);
    return response.data;
  },

  like: async (id: string) => {
    const response = await axiosInstance.post(`${ApiPath.BLOGS}/${id}/like`);
    return response.data;
  },

  incrementView: async (id: string) => {
    const response = await axiosInstance.post(`${ApiPath.BLOGS}/${id}/view`);
    return response.data;
  },
};
