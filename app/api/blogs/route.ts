import { CloudinaryFolder } from '@/enum';
import { apiHandler, successResponse } from '@/lib/api';
import { auth } from '@/lib/auth.lib';
import { uploadFileToCloudinary } from '@/lib/cloudinary';
import dbConnect from '@/lib/db';
import Blog, { IBlogDocument } from '@/models/Blog';
import '@/models/Category';
import '@/models/User';
import { BlogField } from '@/modules/blogs/blog.enum';
import mongoose from 'mongoose';

export const GET = apiHandler(async (request: Request) => {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const categoryId = searchParams.get('categoryId');
  const slug = searchParams.get('slug');
  const limit = searchParams.get('limit');
  const sort = searchParams.get('sort');
  const title = searchParams.get('title');
  const isFeatured = searchParams.get('featured');

  const query: mongoose.QueryFilter<IBlogDocument> = {};

  if (status) {
    query.status = status;
  }

  if (categoryId) {
    query.categoryId = categoryId;
  }

  if (slug) {
    query.slug = slug;
  }

  if (title) {
    query.$or = [{ title: { $regex: title, $options: 'i' } }];
  }

  if (isFeatured !== null) {
    query.isFeatured = isFeatured === 'true';
  }

  let blogQuery = Blog.find(query).populate('author').populate('category');

  if (sort === '-publishedAt') {
    blogQuery = blogQuery.sort({ publishedAt: -1 });
  } else {
    blogQuery = blogQuery.sort({ createdAt: -1 });
  }

  if (limit) {
    blogQuery = blogQuery.limit(parseInt(limit));
  }

  const blogs = await blogQuery.exec();

  return successResponse(blogs);
});

export const POST = apiHandler(async (request: Request) => {
  await dbConnect();
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const formData = await request.formData();

  const title = formData.get(BlogField.TITLE);
  const content = formData.get(BlogField.CONTENT);
  const categoryId = formData.get(BlogField.CATEGORY_ID);
  const tags = formData.get(BlogField.TAGS);
  const metaKeywords = formData.get(BlogField.META_KEYWORDS);
  const metaDescription = formData.get(BlogField.META_DESCRIPTION);
  const isFeatured = formData.get(BlogField.IS_FEATURED) === 'true';
  const coverImageFile = formData.get(BlogField.COVER_IMAGE);

  let coverImageUrl = '';

  if (coverImageFile instanceof File) {
    coverImageUrl = await uploadFileToCloudinary(coverImageFile, CloudinaryFolder.BLOGS);
  } else if (typeof coverImageFile === 'string') {
    coverImageUrl = coverImageFile;
  }

  const slug = (title as string)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const existingBlog = await Blog.findOne({ slug });
  if (existingBlog) {
    throw new Error('Blog with this title already exists');
  }

  const blog = await Blog.create({
    [BlogField.TITLE]: title as string,
    slug,
    [BlogField.CONTENT]: content as string,
    [BlogField.CATEGORY_ID]: categoryId as string,
    [BlogField.COVER_IMAGE]: coverImageUrl,
    [BlogField.AUTHOR_ID]: session.user.id,
    [BlogField.TAGS]: tags as string,
    [BlogField.META_KEYWORDS]: metaKeywords as string,
    [BlogField.META_DESCRIPTION]: metaDescription as string,
    [BlogField.IS_FEATURED]: isFeatured,
    publishedAt: new Date(),
  });

  return successResponse(blog, 'Blog created successfully', 201);
});
