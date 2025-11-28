'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiEdit2, FiEye, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';

import PageHeader from '@/components/shared/PageHeader';
import { Column, Table } from '@/components/shared/Table';
import Button from '@/components/ui/Button';
import { Routes } from '@/enum/routes.enum';
import { formatDate } from '@/lib/date.lib';
import { BlogField, BlogStatus } from '../../blog.enum';
import { useBlogs, useDeleteBlog, useUpdateBlog } from '../../blog.hooks';
import { IBlog } from '../../blog.type';
import ChangeBlogStatus from './ChangeBlogStatus';

const AdminBlogs = () => {
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const { data: blogs = [], isLoading } = useBlogs(new URLSearchParams(), false);
  const { mutate: deleteBlog } = useDeleteBlog();
  const { mutate: updateBlog } = useUpdateBlog();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      deleteBlog(id);
    }
  };

  const handleChangeStatus = (blog: IBlog) => {
    setSelectedBlog(blog);
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedBlog(null);
  };

  const handlePublish = async (blog: IBlog) => {
    if (blog[BlogField.STATUS] === BlogStatus.PUBLISHED) {
      alert('This blog is already published.');
      return;
    }

    if (
      confirm(
        `Are you sure you want to publish "${blog[BlogField.TITLE]}"? It will be visible to everyone.`
      )
    ) {
      updateBlog({
        id: blog[BlogField.ID],
        data: {
          [BlogField.TITLE]: blog[BlogField.TITLE],
          [BlogField.CONTENT]: blog[BlogField.CONTENT],
          [BlogField.CATEGORY_ID]: blog[BlogField.CATEGORY_ID],
          [BlogField.COVER_IMAGE]: blog[BlogField.COVER_IMAGE],
          [BlogField.TAGS]: blog[BlogField.TAGS],
          [BlogField.META_KEYWORDS]: blog[BlogField.META_KEYWORDS],
          [BlogField.META_DESCRIPTION]: blog[BlogField.META_DESCRIPTION],
          [BlogField.IS_FEATURED]: blog[BlogField.IS_FEATURED],
          [BlogField.STATUS]: BlogStatus.PUBLISHED,
        },
      });
    }
  };

  const getStatusBadge = (status: BlogStatus) => {
    const statusConfig = {
      [BlogStatus.PUBLISHED]: {
        className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        label: 'Published',
      },
      [BlogStatus.DRAFT]: {
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        label: 'Draft',
      },
      [BlogStatus.ARCHIVED]: {
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        label: 'Archived',
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const columns: Column<IBlog>[] = [
    {
      header: 'Cover',
      accessorKey: BlogField.COVER_IMAGE,
      cell: (blog) => (
        <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-border">
          <Image
            src={blog[BlogField.COVER_IMAGE]}
            alt={blog[BlogField.TITLE]}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: 'Title',
      accessorKey: BlogField.TITLE,
      cell: (blog) => (
        <div className="max-w-xs">
          <div className="font-medium text-foreground truncate">{blog[BlogField.TITLE]}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: BlogField.CATEGORY,
      cell: (blog) => (
        <div className="text-sm text-foreground">
          {blog[BlogField.CATEGORY]?.name || 'Uncategorized'}
        </div>
      ),
    },
    {
      header: 'Author',
      accessorKey: BlogField.AUTHOR,
      cell: (blog) => (
        <div className="text-sm text-foreground">{blog[BlogField.AUTHOR]?.name || 'Unknown'}</div>
      ),
    },
    {
      header: 'Status',
      accessorKey: BlogField.STATUS,
      cell: (blog) => (
        <button
          onClick={() => handleChangeStatus(blog)}
          className="hover:opacity-80 transition-opacity"
        >
          {getStatusBadge(blog[BlogField.STATUS])}
        </button>
      ),
    },
    {
      header: 'Featured',
      accessorKey: BlogField.IS_FEATURED,
      cell: (blog) => (
        <span className="text-sm text-foreground">
          {blog[BlogField.IS_FEATURED] ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      header: 'Views',
      accessorKey: BlogField.VIEWS,
      cell: (blog) => (
        <div className="flex items-center gap-1 text-sm text-muted">
          {blog[BlogField.VIEWS] || 0}
        </div>
      ),
    },
    {
      header: 'Created',
      accessorKey: BlogField.CREATED_AT,
      cell: (blog) => (
        <div className="text-sm text-muted">{formatDate(new Date(blog[BlogField.CREATED_AT]))}</div>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right text-sm font-medium',
      cell: (blog) => (
        <div className="flex justify-end gap-1">
          <Link
            href={`${Routes.ADMIN_BLOGS}/${blog[BlogField.SLUG]}`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
            title="View blog"
          >
            <FiEye size={18} />
          </Link>
          {blog[BlogField.STATUS] !== BlogStatus.PUBLISHED && (
            <button
              onClick={() => handlePublish(blog)}
              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-2 rounded hover:bg-green-50 dark:hover:bg-green-900/20"
              title="Publish blog"
            >
              <FiUpload size={18} />
            </button>
          )}
          <Link
            href={`${Routes.ADMIN_BLOGS_EDIT}/${blog[BlogField.ID]}`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
            title="Edit blog"
          >
            <FiEdit2 size={18} />
          </Link>
          <button
            onClick={() => handleDelete(blog[BlogField.ID])}
            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Delete blog"
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
        title="Blogs"
        description="Manage your blog posts and their status"
        action={
          <Link href={`${Routes.ADMIN_BLOGS}/create`}>
            <Button className="flex items-center gap-2">
              <FiPlus />
              Create Blog
            </Button>
          </Link>
        }
      />
      <Table
        data={blogs}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No blogs found. Create your first blog to get started."
        keyField={BlogField.ID}
      />
      {selectedBlog && (
        <ChangeBlogStatus
          blog={selectedBlog}
          isOpen={isStatusModalOpen}
          onClose={handleCloseStatusModal}
        />
      )}
    </div>
  );
};

export default AdminBlogs;
