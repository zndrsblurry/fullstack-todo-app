// src/store/todo.store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as api from '@/services/api';

export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  // --- sync actions (internal use mostly) ---
  _setTodos: (todos: Todo[]) => void;
  _addTodo: (todo: Todo) => void;
  _updateTodo: (id: number, updatedFields: Partial<Omit<Todo, 'id'>>) => void;
  _removeTodo: (id: number) => void;
  _setLoading: (loading: boolean) => void;
  _setError: (error: string | null) => void;
  // --- async actions (public API for components) ---
  fetchTodos: () => Promise<void>;
  addTodo: (newTodoData: api.CreateTodoPayload) => Promise<void>;
  toggleTodoCompleted: (id: number, currentState: boolean) => Promise<void>;
  updateTodoDetails: (
    id: number,
    updatedData: api.UpdateTodoPayload,
  ) => Promise<void>; // for title/description updates
  deleteTodo: (id: number) => Promise<void>;
}

// create store with stable references to functions
export const useTodoStore = create<TodoState>()(
  devtools(
    (set, get) => {
      // create actions with stable references
      const actions = {
        // --- internal sync actions implementation ---
        _setTodos: (todos: Todo[]) =>
          set({ todos, loading: false, error: null }),
        _addTodo: (todo: Todo) =>
          set((state) => ({ todos: [...state.todos, todo], loading: false })),
        _updateTodo: (id: number, updatedFields: Partial<Omit<Todo, 'id'>>) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, ...updatedFields } : todo,
            ),
            loading: false,
          })),
        _removeTodo: (id: number) =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
            loading: false,
          })),
        _setLoading: (loading: boolean) => set({ loading }),
        _setError: (error: string | null) => set({ error, loading: false }),

        // --- async actions implementation ---
        fetchTodos: async () => {
          actions._setLoading(true);
          try {
            const fetchedTodos = await api.getTodos();
            actions._setTodos(fetchedTodos);
          } catch (err) {
            actions._setError(
              err instanceof Error ? err.message : 'Failed to fetch todos',
            );
          }
        },

        addTodo: async (newTodoData: api.CreateTodoPayload) => {
          actions._setLoading(true);
          try {
            const createdTodo = await api.createTodo(newTodoData);
            actions._addTodo(createdTodo);
          } catch (err) {
            actions._setError(
              err instanceof Error ? err.message : 'Failed to add todo',
            );
          }
        },

        toggleTodoCompleted: async (id: number, currentState: boolean) => {
          const optimisticState = !currentState;

          // optimistic UI: update locally first
          actions._updateTodo(id, { completed: optimisticState });
          actions._setLoading(true); // indicate background activity

          try {
            // send the actual state change to the backend
            await api.updateTodo(id, { completed: optimisticState });
            // API call successful, state is already updated optimistically
            set({ loading: false }); // turn off loading indicator
          } catch (err) {
            actions._setError(
              err instanceof Error
                ? err.message
                : 'Failed to update todo status',
            );
            // rollback optimistic update
            actions._updateTodo(id, { completed: currentState }); // revert to original state
          }
        },

        updateTodoDetails: async (
          id: number,
          updatedData: api.UpdateTodoPayload,
        ) => {
          actions._setLoading(true);
          try {
            const updatedTodo = await api.updateTodo(id, updatedData);
            actions._updateTodo(id, updatedTodo);
          } catch (err) {
            actions._setError(
              err instanceof Error
                ? err.message
                : 'Failed to update todo details',
            );
          }
        },

        deleteTodo: async (id: number) => {
          // optimistic UI: remove locally first
          // store original state for rollback
          const originalTodos = get().todos;
          actions._removeTodo(id);
          // indicate background activity
          actions._setLoading(true);

          try {
            await api.deleteTodo(id);
            // API call successful, state is already updated optimistically
            // turn off loading indicator
            set({ loading: false });
          } catch (err) {
            actions._setError(
              err instanceof Error ? err.message : 'Failed to delete todo',
            );
            // rollback optimistic update
            set({ todos: originalTodos, error: get().error, loading: false }); // Restore original list
          }
        },
      };

      return {
        // initial state
        todos: [],
        loading: false,
        error: null,
        ...actions,
      };
    },
    { name: 'TodoStore' },
  ),
);

// selector hooks for better performance
export const useTodoActions = () => {
  return {
    fetchTodos: useTodoStore((state) => state.fetchTodos),
    addTodo: useTodoStore((state) => state.addTodo),
    toggleTodoCompleted: useTodoStore((state) => state.toggleTodoCompleted),
    deleteTodo: useTodoStore((state) => state.deleteTodo),
    updateTodoDetails: useTodoStore((state) => state.updateTodoDetails),
  };
};

export const useTodoData = () => {
  return {
    todos: useTodoStore((state) => state.todos),
    loading: useTodoStore((state) => state.loading),
    error: useTodoStore((state) => state.error),
  };
};
