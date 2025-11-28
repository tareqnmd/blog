import { CloudinaryFolder } from '@/enum';
import { deleteFileFromCloudinary, uploadFileToCloudinary } from '@/lib/cloudinary';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { CategoryField } from '@/modules/categories/categories.enum';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const name = formData.get(CategoryField.NAME);
    const description = formData.get(CategoryField.DESCRIPTION);
    const iconFile = formData.get(CategoryField.ICON);

    let iconUrl = existingCategory[CategoryField.ICON];

    if (iconFile instanceof File) {
      iconUrl = await uploadFileToCloudinary(
        iconFile,
        CloudinaryFolder.CATEGORIES,
        existingCategory[CategoryField.ICON]
      );
    } else if (typeof iconFile === 'string' && iconFile !== iconUrl) {
      iconUrl = iconFile;
    }

    const updateData = {
      [CategoryField.NAME]: name as string,
      [CategoryField.DESCRIPTION]: description as string,
      [CategoryField.ICON]: iconUrl,
    };

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ data: updatedCategory });
  } catch (error) {
    console.error('Error updating category:', error);
    const err = error as { code?: number; message?: string };
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Category name already exists' }, { status: 400 });
    }
    return NextResponse.json(
      { error: err.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    if (category[CategoryField.ICON]) {
      await deleteFileFromCloudinary(category[CategoryField.ICON]);
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
