import { ApiPath } from '@/enum';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { CategoryField } from '@/modules/categories/categories.enum';
import { ICategoryFormData } from '@/modules/categories/categories.type';

export const categoryService = {
  getCategories: async (searchParams: URLSearchParams = new URLSearchParams()) => {
    const params = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
    });
    const response = await axiosInstance.get(ApiPath.CATEGORIES, {
      params,
    });
    return response.data;
  },

  create: async (data: ICategoryFormData) => {
    const payload = {
      ...data,
      [CategoryField.ICON]:
        data[CategoryField.ICON] instanceof File
          ? data[CategoryField.ICON].toString()
          : data[CategoryField.ICON],
    };

    const response = await axiosInstance.post(ApiPath.CATEGORIES, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  update: async (id: string, data: ICategoryFormData) => {
    const payload = {
      ...data,
      [CategoryField.ICON]:
        data[CategoryField.ICON] instanceof File
          ? data[CategoryField.ICON].toString()
          : data[CategoryField.ICON],
    };

    const response = await axiosInstance.put(`${ApiPath.CATEGORIES}/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`${ApiPath.CATEGORIES}/${id}`);
    return response.data;
  },
};
