import { CloudinaryFolder } from '@/enum';
import { ApiError, apiHandler, successResponse } from '@/lib/api';
import { auth } from '@/lib/auth.lib';
import { deleteFileFromCloudinary, uploadFileToCloudinary } from '@/lib/cloudinary';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { BlogField } from '@/modules/blogs/blog.enum';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export const GET = apiHandler(async (request: Request, { params }: RouteParams) => {
  await dbConnect();
  const { id } = await params;

  let blog;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findById(id).populate('author').populate('category');
  } else {
    blog = await Blog.findOne({ slug: id }).populate('author').populate('category');
  }

  if (!blog) {
    throw new ApiError('Blog not found', 404);
  }

  return successResponse(blog);
});

export const PUT = apiHandler(async (request: Request, { params }: RouteParams) => {
  await dbConnect();
  const session = await auth();

  if (!session?.user) {
    throw new ApiError('Unauthorized', 401);
  }

  const { id } = await params;
  const existingBlog = await Blog.findById(id);

  if (!existingBlog) {
    throw new ApiError('Blog not found', 404);
  }

  const formData = await request.formData();

  const title = formData.get(BlogField.TITLE);
  const content = formData.get(BlogField.CONTENT);
  const categoryId = formData.get(BlogField.CATEGORY_ID);
  const tags = formData.get(BlogField.TAGS);
  const metaKeywords = formData.get(BlogField.META_KEYWORDS);
  const metaDescription = formData.get(BlogField.META_DESCRIPTION);
  const isFeatured = formData.get(BlogField.IS_FEATURED) === 'true';
  const status = formData.get(BlogField.STATUS);
  const coverImageFile = formData.get(BlogField.COVER_IMAGE);

  let coverImageUrl = existingBlog[BlogField.COVER_IMAGE];

  if (coverImageFile instanceof File) {
    coverImageUrl = await uploadFileToCloudinary(
      coverImageFile,
      CloudinaryFolder.BLOGS,
      existingBlog[BlogField.COVER_IMAGE]
    );
  } else if (typeof coverImageFile === 'string' && coverImageFile !== coverImageUrl) {
    coverImageUrl = coverImageFile;
  }

  const updateData = {
    [BlogField.TITLE]: title as string,
    [BlogField.CONTENT]: content as string,
    [BlogField.CATEGORY_ID]: categoryId as string,
    [BlogField.COVER_IMAGE]: coverImageUrl,
    [BlogField.TAGS]: tags as string,
    [BlogField.META_KEYWORDS]: metaKeywords as string,
    [BlogField.META_DESCRIPTION]: metaDescription as string,
    [BlogField.IS_FEATURED]: isFeatured,
    ...(status && { [BlogField.STATUS]: status as string }),
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return successResponse(updatedBlog);
});

export const DELETE = apiHandler(async (request: Request, { params }: RouteParams) => {
  await dbConnect();
  const session = await auth();

  if (!session?.user) {
    throw new ApiError('Unauthorized', 401);
  }

  const { id } = await params;
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new ApiError('Blog not found', 404);
  }

  if (blog[BlogField.COVER_IMAGE]) {
    await deleteFileFromCloudinary(blog[BlogField.COVER_IMAGE]);
  }

  await Blog.findByIdAndDelete(id);

  return successResponse({ message: 'Blog deleted successfully' });
});
