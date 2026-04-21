import { create } from 'zustand';
import { Todo, TodoFormData, TodoFilters, Category } from '../types';
import { todoApi, categoryApi } from '../services/api';

interface TodoStore {
  todos: Todo[];
  categories: Category[];
  filters: TodoFilters;
  loading: boolean;
  error: string | null;

  // Todo actions
  fetchTodos: () => Promise<void>;
  createTodo: (data: TodoFormData) => Promise<void>;
  updateTodo: (id: string, data: Partial<TodoFormData> & { completed?: boolean }) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;

  // Category actions
  fetchCategories: () => Promise<void>;
  createCategory: (data: { name: string; color: string }) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Filter actions
  setFilters: (filters: Partial<TodoFilters>) => void;
  clearFilters: () => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  categories: [],
  filters: {
    sortBy: 'createdAt',
    order: 'desc',
  },
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await todoApi.getAll(get().filters);
      set({ todos, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch todos', loading: false });
    }
  },

  createTodo: async (data: TodoFormData) => {
    set({ loading: true, error: null });
    try {
      await todoApi.create(data);
      await get().fetchTodos();
    } catch (error) {
      set({ error: 'Failed to create todo', loading: false });
    }
  },

  updateTodo: async (id: string, data: Partial<TodoFormData> & { completed?: boolean }) => {
    set({ loading: true, error: null });
    try {
      await todoApi.update(id, data);
      await get().fetchTodos();
    } catch (error) {
      set({ error: 'Failed to update todo', loading: false });
    }
  },

  deleteTodo: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await todoApi.delete(id);
      await get().fetchTodos();
    } catch (error) {
      set({ error: 'Failed to delete todo', loading: false });
    }
  },

  toggleTodo: async (id: string) => {
    const todo = get().todos.find((t) => t.id === id);
    if (todo) {
      await get().updateTodo(id, { completed: !todo.completed });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await categoryApi.getAll();
      set({ categories });
    } catch (error) {
      set({ error: 'Failed to fetch categories' });
    }
  },

  createCategory: async (data: { name: string; color: string }) => {
    try {
      await categoryApi.create(data);
      await get().fetchCategories();
    } catch (error) {
      set({ error: 'Failed to create category' });
    }
  },

  deleteCategory: async (id: string) => {
    try {
      await categoryApi.delete(id);
      await get().fetchCategories();
      await get().fetchTodos();
    } catch (error) {
      set({ error: 'Failed to delete category' });
    }
  },

  setFilters: (filters: Partial<TodoFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
    get().fetchTodos();
  },

  clearFilters: () => {
    set({
      filters: {
        sortBy: 'createdAt',
        order: 'desc',
      },
    });
    get().fetchTodos();
  },
}));
