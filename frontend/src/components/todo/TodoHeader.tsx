import React from 'react';

interface TodoHeaderProps {
  title: string;
  className?: string;
}

export function TodoHeader({ title, className }: TodoHeaderProps) {
  return (
    <h2 className={`mb-4 text-xl font-semibold ${className || ''}`}>{title}</h2>
  );
}
