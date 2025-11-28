import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Category from '@/models/Category';
import Blog from '@/models/Blog';
import { IBlog } from '@/modules/blogs/blog.type';
import { ICategory } from '@/modules/categories/categories.type';

const userMap = new Map<string, string>();
const categoryMap = new Map<string, string>();

export async function POST() {
  try {
    await dbConnect();

    const dbPath = path.join(process.cwd(), 'db.json');
    const fileContents = await fs.readFile(dbPath, 'utf8');
    const data = JSON.parse(fileContents);
    const blogs: IBlog[] = data.blogs;
    const categories: ICategory[] = data.categories;

    console.log('Seeding Users...');
    for (const blog of blogs) {
      const author = blog.author;
      if (author && author.email) {
        let user = await User.findOne({ email: author.email });
        if (!user) {
          user = await User.create({
            name: author.name,
            email: author.email,
            role: author.role,
          });
        }
        userMap.set(author.id, user._id.toString());
      }
    }

    console.log('Seeding Categories...');
    for (const cat of categories) {
      let category = await Category.findOne({ name: cat.name });
      if (!category) {
        category = await Category.create({
          name: cat.name,
          description: cat.description,
          icon: cat.icon,
          status: cat.status,
        });
      }
      categoryMap.set(cat.id, category._id.toString());
    }

    console.log('Seeding Blogs...');
    for (const blog of blogs) {
      const existingBlog = await Blog.findOne({ slug: blog.slug });
      if (!existingBlog) {
        const newAuthorId = userMap.get(blog.author.id);
        const newCategoryId = categoryMap.get(blog.categoryId);

        if (newAuthorId && newCategoryId) {
          await Blog.create({
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            coverImage: blog.coverImage,
            authorId: newAuthorId,
            categoryId: newCategoryId,
            tags: blog.tags,
            views: blog.views,
            status: blog.status,
            isFeatured: blog.isFeatured || false,
            metaDescription: blog.metaDescription,
            publishedAt: blog.publishedAt ? new Date(blog.publishedAt) : undefined,
            createdAt: blog.createdAt ? new Date(blog.createdAt) : undefined,
            updatedAt: blog.updatedAt ? new Date(blog.updatedAt) : undefined,
          });
        } else {
          console.warn(`Skipping blog ${blog.slug} due to missing author or category mapping`);
        }
      }
    }

    return NextResponse.json({ message: 'Seeding completed successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}
