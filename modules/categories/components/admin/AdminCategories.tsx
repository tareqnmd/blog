'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';

import PageHeader from '@/components/shared/PageHeader';
import { Column, Table } from '@/components/shared/Table';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { CategoryField, CategoryStatus } from '../../categories.enum';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '../../categories.hooks';
import { ICategory, ICategoryFormData } from '../../categories.type';
import CategoryForm from './CategoryForm';

const AdminCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const { data: categories = [], isLoading } = useCategories();
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSubmit = (data: ICategoryFormData) => {
    if (selectedCategory) {
      updateCategory(
        { id: selectedCategory[CategoryField.ID], data },
        {
          onSuccess: () => handleCloseModal(),
        }
      );
    } else {
      createCategory(data, {
        onSuccess: () => handleCloseModal(),
      });
    }
  };

  const columns: Column<ICategory>[] = [
    {
      header: 'Icon',
      accessorKey: CategoryField.ICON,
      cell: (category) =>
        category[CategoryField.ICON] && category[CategoryField.ICON].startsWith('http') ? (
          <div className="relative w-10 h-10 rounded overflow-hidden">
            <Image
              src={category[CategoryField.ICON]}
              alt={category[CategoryField.NAME]}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <span className="text-muted">{category[CategoryField.ICON]}</span>
        ),
    },
    {
      header: 'Name',
      accessorKey: CategoryField.NAME,
      className: 'font-medium text-foreground',
    },
    {
      header: 'Description',
      accessorKey: CategoryField.DESCRIPTION,
      className: 'text-muted max-w-xs truncate',
    },
    {
      header: 'Status',
      accessorKey: CategoryField.STATUS,
      cell: (category) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-foreground ${
            category[CategoryField.STATUS] === CategoryStatus.ACTIVE
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {category[CategoryField.STATUS]}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right text-sm font-medium',
      cell: (category) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleEdit(category)}
            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-2 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => handleDelete(category[CategoryField.ID])}
            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Categories"
        action={
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <FiPlus />
            Create Category
          </Button>
        }
      />
      <Table
        data={categories}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No categories found"
        keyField={CategoryField.ID}
      />
      <Modal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        title={selectedCategory ? 'Edit Category' : 'Create Category'}
        size="lg"
      >
        <CategoryForm
          onSubmit={handleSubmit}
          defaultValues={
            selectedCategory
              ? {
                  [CategoryField.NAME]: selectedCategory[CategoryField.NAME],
                  [CategoryField.DESCRIPTION]: selectedCategory[CategoryField.DESCRIPTION],
                  [CategoryField.ICON]: selectedCategory[CategoryField.ICON],
                }
              : undefined
          }
          isSubmitting={isCreating || isUpdating}
        />
      </Modal>
    </div>
  );
};

export default AdminCategories;
