import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Todo } from '@/store/todo.store';

// define the schema for the form
const formSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty.' }).max(100),
  description: z.string().max(500).optional(),
});

export type EditTodoFormValues = z.infer<typeof formSchema>;

interface TodoEditModalProps {
  todo: Todo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, values: EditTodoFormValues) => Promise<void>;
  loading: boolean;
}

export function TodoEditModal({
  todo,
  open,
  onOpenChange,
  onSubmit,
  loading,
}: TodoEditModalProps) {
  // form setup
  const form = useForm<EditTodoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
    },
  });

  // reset form when todo changes
  React.useEffect(() => {
    if (todo) {
      form.reset({
        title: todo.title,
        description: todo.description || '',
      });
    }
  }, [form, todo]);

  // form submit handler
  const handleSubmit = async (values: EditTodoFormValues) => {
    if (!todo) return;

    try {
      await onSubmit(todo.id, values);
      onOpenChange(false);
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
