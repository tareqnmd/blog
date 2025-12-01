import { UserField } from '@/enum/field.enum';
import { formatDate } from '@/lib';
import { BlogField } from '@/modules/blogs/blog.enum';
import { IBlog } from '@/modules/blogs/blog.type';
import Image from 'next/image';
import { FiCalendar, FiClock, FiEye } from 'react-icons/fi';
import { getTimeToRead } from '../../blog.helper';

const BlogInfo = ({ blog, cardView = false }: { blog: IBlog; cardView?: boolean }) => {
  return (
    <div className="flex items-center gap-4 text-sm text-muted flex-wrap">
      <div className="flex items-center gap-1.5">
        <Image
          src={blog[BlogField.AUTHOR][UserField.IMAGE] || '/images/placeholder.jpg'}
          alt={blog[BlogField.AUTHOR][UserField.NAME]}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span>{blog[BlogField.AUTHOR][UserField.NAME]}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <FiCalendar className="w-4 h-4" />
        <span>{formatDate(new Date(blog[BlogField.PUBLISHED_AT] || ''))}</span>
      </div>
      {!cardView && (
        <div className="flex items-center gap-1.5">
          <FiClock className="w-4 h-4" />
          <span>{getTimeToRead(blog[BlogField.CONTENT])} read</span>
        </div>
      )}
      {!cardView && (
        <div className="flex items-center gap-1.5">
          <FiEye className="w-4 h-4" />
          <span>{blog[BlogField.VIEWS]} views</span>
        </div>
      )}
    </div>
  );
};

export default BlogInfo;
