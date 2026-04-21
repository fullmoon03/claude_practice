import React from 'react';
import { useTodoStore } from '../hooks/useTodoStore';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onEdit }) => {
  const { todos, loading, error } = useTodoStore();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        에러: {error}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">할 일이 없습니다.</p>
        <p className="text-gray-400 text-sm mt-2">새로운 할 일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
