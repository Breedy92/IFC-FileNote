"use client";

import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  disabled = false,
  className,
}: RichTextEditorProps) {
  return (
    <div
      className={cn(
        'prose dark:prose-invert max-w-none',
        'min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      contentEditable={!disabled}
      dangerouslySetInnerHTML={{ __html: value }}
      onInput={(e) => onChange(e.currentTarget.innerHTML)}
      suppressContentEditableWarning
    />
  );
}