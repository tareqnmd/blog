import { cn } from '@/lib';

const BlogTitle = ({ title, className }: { title: string; className?: string }) => {
  return (
    <h1
      className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight',
        className
      )}
    >
      {title}
    </h1>
  );
};

export default BlogTitle;
