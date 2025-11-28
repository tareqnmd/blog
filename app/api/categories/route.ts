import { CloudinaryFolder } from '@/enum';
import { uploadFileToCloudinary } from '@/lib/cloudinary';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { CategoryField } from '@/modules/categories/categories.enum';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const name = formData.get(CategoryField.NAME);
    const description = formData.get(CategoryField.DESCRIPTION);
    const iconFile = formData.get(CategoryField.ICON);

    let iconUrl = '';

    if (iconFile instanceof File) {
      iconUrl = await uploadFileToCloudinary(iconFile, CloudinaryFolder.CATEGORIES);
    } else if (typeof iconFile === 'string') {
      iconUrl = iconFile;
    }

    const categoryData = {
      [CategoryField.NAME]: name as string,
      [CategoryField.DESCRIPTION]: description as string,
      [CategoryField.ICON]: iconUrl,
    };

    const category = await Category.create(categoryData);
    return NextResponse.json({ data: category }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    const err = error as { code?: number; message?: string };
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Category name already exists' }, { status: 400 });
    }
    return NextResponse.json(
      { error: err.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}
