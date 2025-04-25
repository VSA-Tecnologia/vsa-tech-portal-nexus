
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TagsListProps {
  tags: string[];
  maxTags?: number;
}

export const TagsList = ({ tags, maxTags = 3 }: TagsListProps) => {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {tags.slice(0, maxTags).map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
      {tags.length > maxTags && (
        <Badge variant="secondary" className="text-xs">
          +{tags.length - maxTags}
        </Badge>
      )}
    </div>
  );
};
