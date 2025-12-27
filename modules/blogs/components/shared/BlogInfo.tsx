import { UserField } from '@/enum/field.enum';
import { formatDate } from '@/lib';
import { BlogField } from '@/modules/blogs/blog.enum';
import { IBlog } from '@/modules/blogs/blog.type';
import Image from 'next/image';
import { FiCalendar, FiClock, FiEye } from 'react-icons/fi';
import { getTimeToRead } from '../../blog.helper';
import BlogShare from './BlogShare';

const BlogInfo = ({ blog, cardView = false }: { blog: IBlog; cardView?: boolean }) => {
  return (
    <div className="flex items-center gap-8 text-sm">
      <div className="flex items-center gap-x-4 gap-y-2 flex-wrap text-muted">
        <div className="flex items-center gap-1">
          <Image
            src={blog[BlogField.AUTHOR][UserField.IMAGE] || '/images/placeholder.jpg'}
            alt={blog[BlogField.AUTHOR][UserField.NAME]}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span>{blog[BlogField.AUTHOR][UserField.NAME]}</span>
        </div>
        <div className="flex items-center gap-1">
          <FiCalendar className="w-4 h-4" />
          <span>{formatDate(new Date(blog[BlogField.PUBLISHED_AT] || ''))}</span>
        </div>
        {!cardView && (
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{getTimeToRead(blog[BlogField.CONTENT])}</span>
          </div>
        )}
        {!cardView && (
          <div className="flex items-center gap-1">
            <FiEye className="w-4 h-4" />
            <span>{blog[BlogField.VIEWS]}</span>
          </div>
        )}
      </div>
      <BlogShare
        title={blog[BlogField.TITLE]}
        link={`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog[BlogField.SLUG]}`}
        className="ml-auto"
      />
    </div>
  );
};

export default BlogInfo;
