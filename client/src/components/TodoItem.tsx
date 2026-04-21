import React from 'react';
import { Todo } from '../types';
import { useTodoStore } from '../hooks/useTodoStore';
import { getPriorityColor, getPriorityLabel, formatDueDate, isDueDatePast, isDueDateSoon } from '../utils/helpers';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    if (window.confirm('이 할 일을 삭제하시겠습니까?')) {
      deleteTodo(todo.id);
    }
  };

  const dueDateClass = todo.dueDate
    ? isDueDatePast(todo.dueDate)
      ? 'text-red-600 font-semibold'
      : isDueDateSoon(todo.dueDate)
      ? 'text-orange-600 font-semibold'
      : 'text-gray-600'
    : '';

  return (
    <div className={`bg-white rounded-lg shadow p-4 mb-3 border-l-4 ${
      todo.completed ? 'border-gray-300 opacity-60' : 'border-blue-500'
    }`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.title}
          </h3>

          {todo.description && (
            <p className={`text-sm mt-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(todo.priority)}`}>
              {getPriorityLabel(todo.priority)}
            </span>

            {todo.category && (
              <span
                className="text-xs px-2 py-1 rounded"
                style={{
                  backgroundColor: todo.category.color + '20',
                  color: todo.category.color,
                  border: `1px solid ${todo.category.color}`,
                }}
              >
                {todo.category.name}
              </span>
            )}

            {todo.dueDate && (
              <span className={`text-xs ${dueDateClass}`}>
                📅 {formatDueDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
