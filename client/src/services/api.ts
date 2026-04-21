import axios from 'axios';
import { Todo, TodoFormData, TodoFilters, Category } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Todo API
export const todoApi = {
  getAll: async (filters?: TodoFilters): Promise<Todo[]> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const response = await api.get(`/todos?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  create: async (data: TodoFormData): Promise<Todo> => {
    const response = await api.post('/todos', data);
    return response.data;
  },

  update: async (id: string, data: Partial<TodoFormData> & { completed?: boolean }): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};

// Category API
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  create: async (data: { name: string; color: string }): Promise<Category> => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  update: async (id: string, data: { name?: string; color?: string }): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};

export default api;
