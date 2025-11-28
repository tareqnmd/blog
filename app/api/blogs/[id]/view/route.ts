import { apiHandler, successResponse, ApiError } from '@/lib/api';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export const POST = apiHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    await dbConnect();

    const { id } = await params;

    if (!id) {
      throw new ApiError('Blog ID is required', 400);
    }

    const blog = await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

    if (!blog) {
      throw new ApiError('Blog not found', 404);
    }

    return successResponse({ views: blog.views }, 'View count updated successfully');
  }
);
