interface BlogTagsProps {
  tags?: string;
}

const BlogTags = ({ tags }: BlogTagsProps) => {
  if (!tags) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border/50">
      <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.split(',').map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-lg bg-card-background border border-border text-muted-foreground text-sm hover:border-accent hover:text-accent transition-colors cursor-default"
          >
            #{tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
