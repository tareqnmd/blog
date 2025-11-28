'use client';

import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import { BlogField, BlogStatus } from '../../blog.enum';
import { useUpdateBlog } from '../../blog.hooks';
import { IBlog } from '../../blog.type';

interface ChangeBlogStatusProps {
  blog: IBlog;
  isOpen: boolean;
  onClose: () => void;
}

const ChangeBlogStatus = ({ blog, isOpen, onClose }: ChangeBlogStatusProps) => {
  const [selectedStatus, setSelectedStatus] = useState<BlogStatus>(blog[BlogField.STATUS]);
  const { mutate: updateBlog, isPending } = useUpdateBlog();

  const statusOptions = [
    {
      value: BlogStatus.DRAFT,
      label: 'Draft',
      description: 'Blog is saved but not visible to public',
      className:
        'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    },
    {
      value: BlogStatus.PUBLISHED,
      label: 'Published',
      description: 'Blog is live and visible to public',
      className:
        'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400',
    },
    {
      value: BlogStatus.ARCHIVED,
      label: 'Archived',
      description: 'Blog is hidden from public but preserved',
      className:
        'border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
    },
  ];

  const handleSubmit = () => {
    if (selectedStatus === blog[BlogField.STATUS]) {
      onClose();
      return;
    }

    // Create update data with current blog values and new status
    const updateData = {
      [BlogField.TITLE]: blog[BlogField.TITLE],
      [BlogField.CONTENT]: blog[BlogField.CONTENT],
      [BlogField.CATEGORY_ID]: blog[BlogField.CATEGORY_ID],
      [BlogField.COVER_IMAGE]: blog[BlogField.COVER_IMAGE],
      [BlogField.TAGS]: blog[BlogField.TAGS] || '',
      [BlogField.META_KEYWORDS]: blog[BlogField.META_KEYWORDS] || '',
      [BlogField.META_DESCRIPTION]: blog[BlogField.META_DESCRIPTION] || '',
      [BlogField.IS_FEATURED]: blog[BlogField.IS_FEATURED] || false,
      [BlogField.STATUS]: selectedStatus,
    };

    updateBlog(
      { id: blog[BlogField.ID], data: updateData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose} title="Change Blog Status" size="md">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {blog[BlogField.TITLE]}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current status: <span className="font-medium">{blog[BlogField.STATUS]}</span>
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select new status:
          </label>

          <div className="space-y-3">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedStatus === option.value
                    ? option.className
                    : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={selectedStatus === option.value}
                  onChange={(e) => setSelectedStatus(e.target.value as BlogStatus)}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{option.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || selectedStatus === blog[BlogField.STATUS]}
          >
            {isPending ? 'Updating...' : 'Update Status'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeBlogStatus;
