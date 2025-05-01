import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Todo } from '@/store/todo.store';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TodoEditModal, EditTodoFormValues } from './TodoEditModal';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onEdit: (id: number, data: EditTodoFormValues) => Promise<void>;
}

export function TodoItem({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
}: TodoItemProps) {
  // state for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          {/* left side: checkbox and text */}
          <div className="flex items-start space-x-4">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => onToggleComplete(todo)}
              className="mt-1"
              aria-labelledby={`todo-label-${todo.id}`}
            />
            <div className="grid gap-0.5">
              <Label
                htmlFor={`todo-${todo.id}`}
                id={`todo-label-${todo.id}`}
                className={cn(
                  'text-base leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  todo.completed && 'text-muted-foreground line-through',
                )}
              >
                {todo.title}
              </Label>
              {todo.description && (
                <p
                  className={cn(
                    'text-muted-foreground text-sm',
                    todo.completed && 'line-through',
                  )}
                >
                  {todo.description}
                </p>
              )}
            </div>
          </div>

          {/* right side: action buttons */}
          <div className="flex flex-shrink-0 items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsEditModalOpen(true)}
              aria-label={`Edit todo titled ${todo.title}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-destructive/10 h-8 w-8"
              onClick={() => onDelete(todo)}
              aria-label={`Delete todo titled ${todo.title}`}
            >
              <Trash2 className="text-destructive h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* edit modal */}
      <TodoEditModal
        todo={todo}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={onEdit}
        loading={false}
      />
    </>
  );
}
