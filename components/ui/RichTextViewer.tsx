'use client';

import { cn } from '@/lib/cn.lib';
import '@/styles/rich-text-editor.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';

interface RichTextViewerProps {
  value: string;
  className?: string;
}

type QuillType = Quill;

const RichTextViewer = ({ value, className }: RichTextViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillType | null>(null);
  const [isQuillLoaded, setIsQuillLoaded] = useState(false);

  useEffect(() => {
    if (!viewerRef.current || quillRef.current) return;

    const initQuill = async () => {
      const QuillModule = (await import('quill')).default;

      if (!viewerRef.current || quillRef.current) return;

      const quill = new QuillModule(viewerRef.current, {
        theme: 'snow',
        readOnly: true,
        modules: {
          toolbar: false,
        },
      });

      quillRef.current = quill;
      setIsQuillLoaded(true);

      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }
    };

    initQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [value]);

  useEffect(() => {
    if (!quillRef.current || !isQuillLoaded) return;

    quillRef.current.clipboard.dangerouslyPasteHTML(value || '');
  }, [value, isQuillLoaded]);

  return (
    <div className={cn('rich-text-editor bg-transparent', className)}>
      <div ref={viewerRef} className="ql-container ql-snow quill-view">
        <div className="ql-editor view" />
      </div>
      {!isQuillLoaded && (
        <div className="flex items-center justify-center p-4 text-muted">Loading content...</div>
      )}
    </div>
  );
};

export default RichTextViewer;
