import mongoose, { Document, Model, Schema } from 'mongoose';
import { IBlogDocument } from './Blog';
import { IUserDocument } from './User';

export interface IBlogLikeDocument extends Document {
  blogId: mongoose.Types.ObjectId | IBlogDocument;
  userId: mongoose.Types.ObjectId | IUserDocument;
  createdAt: Date;
  updatedAt: Date;
}

const BlogLikeSchema = new Schema<IBlogLikeDocument>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BlogLikeSchema.index({ blogId: 1, userId: 1 }, { unique: true });

const BlogLike: Model<IBlogLikeDocument> =
  mongoose.models.BlogLike || mongoose.model<IBlogLikeDocument>('BlogLike', BlogLikeSchema);

export default BlogLike;
