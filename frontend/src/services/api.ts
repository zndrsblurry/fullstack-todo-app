// src/services/api.ts
import { Todo } from '@/store/todo.store';
import { fetchApi } from '@/lib/http';

export type CreateTodoPayload = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTodoPayload = Partial<
  Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
>;

export const getTodos = (): Promise<Todo[]> => {
  return fetchApi<Todo[]>('/todos');
};

export const createTodo = (todoData: CreateTodoPayload): Promise<Todo> => {
  return fetchApi<Todo>('/todos', {
    method: 'POST',
    body: JSON.stringify(todoData),
  });
};

export const updateTodo = (
  id: number,
  todoData: UpdateTodoPayload,
): Promise<Todo> => {
  const payload = { ...todoData };
  if (payload.completed !== undefined) {
    payload.completed = !!payload.completed;
  }
  return fetchApi<Todo>(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteTodo = (id: number): Promise<void> => {
  return fetchApi<void>(`/todos/${id}`, {
    method: 'DELETE',
  });
};
