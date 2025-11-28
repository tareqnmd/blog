'use client';

import RichTextViewer from '@/components/ui/RichTextViewer';

interface BlogContentProps {
  content: string;
  description?: string;
}

const BlogContent = ({ content, description }: BlogContentProps) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {description && (
        <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium mb-8">
          {description}
        </p>
      )}
      <RichTextViewer value={content} />
    </div>
  );
};

export default BlogContent;
