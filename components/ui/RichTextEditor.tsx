'use client';

import { cn } from '@/lib/cn.lib';
import '@/styles/rich-text-editor.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useCallback, useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

type QuillType = Quill;

const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Start writing...',
  className,
  disabled = false,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillType | null>(null);
  const isUpdatingRef = useRef(false);
  const [isQuillLoaded, setIsQuillLoaded] = useState(false);

  const handleChange = useCallback(
    (html: string) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';

      if (!textContent.trim()) {
        onChange?.('');
      } else {
        onChange?.(html);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const initQuill = async () => {
      const QuillModule = (await import('quill')).default;

      if (!editorRef.current || quillRef.current) return;

      const quill = new QuillModule(editorRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ['small', false, 'large', 'huge'] }],

              ['bold', 'italic', 'underline', 'strike'],

              [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ align: [] }],

              ['blockquote', 'code-block'],
              ['link', 'image', 'video'],

              ['clean'],
            ],
            handlers: {
              image: function () {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = () => {
                  const file = input.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const range = quill.getSelection(true);
                      quill.insertEmbed(range.index, 'image', e.target?.result);
                      quill.setSelection(range.index + 1);
                    };
                    reader.readAsDataURL(file);
                  }
                };
              },
            },
          },
        },
      });

      quillRef.current = quill;
      setIsQuillLoaded(true);

      if (value) {
        isUpdatingRef.current = true;
        quill.clipboard.dangerouslyPasteHTML(value);
        isUpdatingRef.current = false;
      }

      const handleTextChange = () => {
        if (isUpdatingRef.current) return;
        const html = quill.root.innerHTML;
        handleChange(html);
      };

      quill.on('text-change', handleTextChange);

      return () => {
        quill.off('text-change', handleTextChange);
        if (quillRef.current) {
          quillRef.current = null;
        }
      };
    };

    initQuill();
  }, [handleChange, placeholder, value]);

  useEffect(() => {
    if (!quillRef.current || isUpdatingRef.current) return;

    const currentContent = quillRef.current.root.innerHTML;

    const normalizeHtml = (html: string) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html || '';
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      return textContent.trim();
    };

    const currentText = normalizeHtml(currentContent);
    const newText = normalizeHtml(value || '');

    if (currentText !== newText) {
      isUpdatingRef.current = true;

      const selection = quillRef.current.getSelection();

      if (value) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      } else {
        quillRef.current.setText('');
      }

      if (selection && value) {
        try {
          quillRef.current.setSelection(selection.index, selection.length);
        } catch (e) {
          console.error(e);
        }
      }

      isUpdatingRef.current = false;
    }
  }, [value]);

  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.enable(!disabled);
  }, [disabled]);

  return (
    <div
      className={cn(
        'rich-text-editor bg-transparent',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div ref={editorRef} />
      {!isQuillLoaded && (
        <div className="flex items-center justify-center p-4 text-muted">Loading editor...</div>
      )}
    </div>
  );
};

export default RichTextEditor;
