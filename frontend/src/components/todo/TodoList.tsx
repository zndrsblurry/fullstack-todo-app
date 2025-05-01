import React from 'react';
import { Todo } from '@/store/todo.store';
import { TodoItem } from './TodoItem';
import { TodoEmpty } from './TodoEmpty';
import { TodoLoading } from './TodoLoading';
import { EditTodoFormValues } from './TodoEditModal';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onToggleComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onEdit: (id: number, data: EditTodoFormValues) => Promise<void>;
}

export function TodoList({
  todos,
  loading,
  onToggleComplete,
  onDelete,
  onEdit,
}: TodoListProps) {
  if (loading && todos.length === 0) {
    return <TodoLoading />;
  }

  if (!loading && todos.length === 0) {
    return <TodoEmpty />;
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
