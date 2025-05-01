import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import { toast } from 'sonner';

// TODO: separate form schema from component
const formSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty.' }).max(100),
  description: z.string().max(500).optional(),
});

export type TodoFormValues = z.infer<typeof formSchema>;

interface TodoFormProps {
  onSubmit: (values: TodoFormValues) => Promise<void>;
  loading: boolean;
}

export function TodoForm({ onSubmit, loading }: TodoFormProps) {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', description: '' },
  });

  const handleSubmit = async (values: TodoFormValues) => {
    try {
      await onSubmit(values);
      form.reset();
      toast.success('Todo added successfully!');
    } catch (err) {
      console.error('Error adding todo:', err);
      toast.error('Failed to add todo. Please check the console or try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="What needs to be done?" {...field} />
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
                <Input
                  placeholder="Add more details..."
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Todo'}
        </Button>
      </form>
    </Form>
  );
}
