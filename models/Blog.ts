import { BlogStatus } from '@/modules/blogs/blog.enum';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { ICategoryDocument } from './Category';
import { IUserDocument } from './User';

export interface IBlogDocument extends Document {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  authorId: mongoose.Types.ObjectId | IUserDocument;
  categoryId: mongoose.Types.ObjectId | ICategoryDocument;
  tags: string;
  views: number;
  status: BlogStatus;
  isFeatured: boolean;
  metaKeywords?: string;
  metaDescription?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlogDocument>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    coverImage: {
      type: String,
      required: [true, 'Please provide a cover image'],
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: {
      type: String,
      default: '',
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(BlogStatus),
      default: BlogStatus.DRAFT,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    metaKeywords: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: Record<string, unknown>) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret: Record<string, unknown>) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

BlogSchema.virtual('author', {
  ref: 'User',
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
});

BlogSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

BlogSchema.pre('save', async function () {
  if (this.isFeatured && this.isModified('isFeatured')) {
    await mongoose
      .model('Blog')
      .updateMany({ _id: { $ne: this._id }, isFeatured: true }, { $set: { isFeatured: false } });
  }
});

const Blog: Model<IBlogDocument> =
  mongoose.models.Blog || mongoose.model<IBlogDocument>('Blog', BlogSchema);

export default Blog;
