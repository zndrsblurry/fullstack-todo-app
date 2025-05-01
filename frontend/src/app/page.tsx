'use client';

import React, { useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { TodoForm, TodoList, TodoHeader } from '@/components/todo';
import { useTodoData, useTodoActions, Todo } from '@/store/todo.store';
import type { TodoFormValues } from '@/components/todo/TodoForm';
import { EditTodoFormValues } from '@/components/todo/TodoEditModal';

export default function HomePage() {
  // use selector hooks for better performance
  const { todos, loading, error } = useTodoData();
  const {
    fetchTodos,
    addTodo,
    toggleTodoCompleted,
    deleteTodo,
    updateTodoDetails,
  } = useTodoActions();

  // fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // handle form submission
  const handleAddTodo = useCallback(
    async (values: TodoFormValues) => {
      await addTodo({
        title: values.title,
        description: values.description || null,
        completed: false,
      });
    },
    [addTodo],
  );

  // handler functions for todo actions
  const handleToggleCompleted = useCallback(
    async (todo: Todo) => {
      try {
        await toggleTodoCompleted(todo.id, todo.completed);
        toast.success(
          `Todo "${todo.title}" marked as ${!todo.completed ? 'complete' : 'incomplete'}.`,
        );
      } catch (err) {
        console.error('Error updating todo:', err);
      }
    },
    [toggleTodoCompleted],
  );

  const handleDeleteTodo = useCallback(
    async (todo: Todo) => {
      try {
        await deleteTodo(todo.id);
        toast.success(`"${todo.title}" has been removed.`);
      } catch (err) {
        console.error('Error deleting todo:', err);
      }
    },
    [deleteTodo],
  );

  // handler for editing a todo
  const handleEditTodo = useCallback(
    async (id: number, data: EditTodoFormValues) => {
      try {
        await updateTodoDetails(id, {
          title: data.title,
          description: data.description || null,
        });
        toast.success('Task updated successfully!');
      } catch (err) {
        console.error('Error updating todo:', err);
        toast.error('Failed to update task. Please try again.');
      }
    },
    [updateTodoDetails],
  );

  // error handling effect
  useEffect(() => {
    if (error) {
      toast.error('An Error Occurred', {
        description: error,
      });
    }
  }, [error]);

  return (
    <main className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Todo List</h1>

      {/* add todo form section */}
      <section className="mb-8">
        <TodoForm onSubmit={handleAddTodo} loading={loading} />
      </section>

      {/* todo list section */}
      <section>
        <TodoHeader title="Tasks" />
        <TodoList
          todos={todos}
          loading={loading}
          onToggleComplete={handleToggleCompleted}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      </section>
    </main>
  );
}
