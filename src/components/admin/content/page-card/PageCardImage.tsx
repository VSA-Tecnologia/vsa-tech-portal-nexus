
import React from 'react';
import { ScrollText } from 'lucide-react';

interface PageCardImageProps {
  image?: string;
  title: string;
  variant?: 'list' | 'grid';
}

export const PageCardImage = ({ image, title, variant = 'grid' }: PageCardImageProps) => {
  const isListView = variant === 'list';
  const containerClasses = isListView
    ? "w-full md:w-48 h-32 md:h-auto bg-gray-100 flex items-center justify-center border-b md:border-b-0 md:border-r"
    : "h-40 bg-gray-100 flex items-center justify-center border-b relative";

  if (!image) {
    return (
      <div className={containerClasses}>
        <ScrollText className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
