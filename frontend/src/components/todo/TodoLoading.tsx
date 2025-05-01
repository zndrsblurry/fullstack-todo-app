import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function TodoLoading() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          {/* left side: checkbox and text skeleton */}
          <div className="flex items-start space-x-4">
            <div className="bg-muted size-4 animate-pulse rounded-[4px]" />
            <div className="grid gap-1.5">
              <div className="bg-muted h-5 w-32 animate-pulse rounded" />
              <div className="bg-muted h-4 w-48 animate-pulse rounded opacity-70" />
            </div>
          </div>

          {/* right side: action buttons skeleton */}
          <div className="flex flex-shrink-0 items-center space-x-2">
            <div className="bg-muted size-8 animate-pulse rounded-md" />
            <div className="bg-muted size-8 animate-pulse rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
