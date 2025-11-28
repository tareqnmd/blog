import { Routes } from '@/enum';
import { QueryKeys } from '@/enum/query-keys.enum';
import { blogService } from '@/service/blog.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogStatus } from './blog.enum';
import { IBlogFormData } from './blog.type';

export const useBlogs = (
  searchParams: URLSearchParams = new URLSearchParams(),
  onlyPublished: boolean = true
) => {
  return useQuery({
    queryKey: [QueryKeys.BLOGS, searchParams.toString()],
    queryFn: async () => {
      if (onlyPublished) {
        searchParams.set('status', BlogStatus.PUBLISHED);
      }
      const res = await blogService.getBlogs(searchParams);
      console.log(res);
      return res?.data ?? [];
    },
    retry: false,
  });
};

export const useLatestBlogs = () => {
  return useQuery({
    queryKey: [QueryKeys.BLOGS, 'latest'],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('limit', '6');
      params.set('status', BlogStatus.PUBLISHED);
      params.set('sort', '-createdAt');
      const res = await blogService.getBlogs(params);
      return res;
    },
    retry: false,
  });
};

export const useFeaturedBlog = () => {
  return useQuery({
    queryKey: [QueryKeys.BLOGS, 'featured'],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('featured', 'true');
      params.set('status', BlogStatus.PUBLISHED);
      params.set('limit', '1');
      params.set('sort', '-publishedAt');
      const res = await blogService.getBlogs(params);
      return res?.[0];
    },
    retry: false,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.BLOGS, id],
    queryFn: async () => {
      const res = await blogService.getBlog(id);
      return res;
    },
    enabled: !!id,
    retry: false,
  });
};

export const useBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: [QueryKeys.BLOGS, 'slug', slug],
    queryFn: async () => {
      const res = await blogService.getBlogBySlug(slug);
      return res;
    },
    enabled: !!slug,
    retry: false,
  });
};

export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId: string) => blogService.like(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BLOGS] });
    },
  });
};

export const useIncrementView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId: string) => blogService.incrementView(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BLOGS] });
    },
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BLOGS] });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IBlogFormData }) => blogService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BLOGS] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BLOGS] });
    },
  });
};

export const useBlogFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (selectedCategory) params.set('category', selectedCategory);

    router.push(`${Routes.BLOGS}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, selectedCategory, router]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const queryParams = new URLSearchParams();
  if (debouncedSearch) queryParams.set('search', debouncedSearch);
  if (selectedCategory) queryParams.set('category', selectedCategory);
  queryParams.set('sort', '-publishedAt');

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
    queryParams,
  };
};
