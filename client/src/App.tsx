import React, { useEffect, useState } from 'react';
import { useTodoStore } from './hooks/useTodoStore';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import CategoryManager from './components/CategoryManager';
import { Todo } from './types';

function App() {
  const { fetchTodos, fetchCategories } = useTodoStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, [fetchTodos, fetchCategories]);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">할 일 관리</h1>
          <p className="text-gray-600">효율적으로 일정을 관리하세요</p>
        </div>

        {/* Add Todo Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg transition-colors"
          >
            + 새 할 일 추가
          </button>
        </div>

        {/* Category Manager */}
        <CategoryManager />

        {/* Filter Bar */}
        <FilterBar />

        {/* Todo List */}
        <TodoList onEdit={handleEdit} />

        {/* Todo Form Modal */}
        {showForm && (
          <TodoForm editingTodo={editingTodo} onClose={handleCloseForm} />
        )}
      </div>
    </div>
  );
}

export default App;
