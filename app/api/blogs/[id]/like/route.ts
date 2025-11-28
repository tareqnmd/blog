import { ApiError, apiHandler, successResponse } from '@/lib/api';
import { auth } from '@/lib/auth.lib';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import BlogLike from '@/models/BlogLike';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export const POST = apiHandler(async (request: Request, { params }: RouteParams) => {
  const session = await auth();
  if (!session?.user) {
    throw new ApiError('Unauthorized', 401);
  }

  const { id: blogId } = await params;
  const userId = session.user.id;

  await dbConnect();

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError('Blog not found', 404);
  }

  const existingLike = await BlogLike.findOne({ blogId, userId });

  let isLiked = false;

  if (existingLike) {
    await existingLike.deleteOne();
    isLiked = false;
  } else {
    if (!existingLike) {
      try {
        await BlogLike.create({ blogId, userId });
        isLiked = true;
      } catch (error) {
        if ((error as { code?: number }).code === 11000) {
          isLiked = true;
        } else {
          throw error;
        }
      }
    }
  }

  const likesCount = await BlogLike.countDocuments({ blogId });

  return successResponse({
    isLiked,
    likes: likesCount,
  });
});
