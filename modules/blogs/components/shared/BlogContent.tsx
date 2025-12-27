'use client';

import RichTextViewer from '@/components/ui/RichTextViewer';

const BlogContent = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <RichTextViewer value={content} />
    </div>
  );
};

export default BlogContent;
