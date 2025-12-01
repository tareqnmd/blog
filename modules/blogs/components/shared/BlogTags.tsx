import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';

const BlogTags = ({ blog }: { blog: IBlog }) => {
  if (!blog[BlogField.TAGS]) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {blog[BlogField.TAGS].split(',').map((tag: string) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-lg bg-card-background border border-border text-muted-foreground text-sm hover:border-accent hover:text-accent transition-colors cursor-default"
        >
          #{tag.trim()}
        </span>
      ))}
    </div>
  );
};

export default BlogTags;
