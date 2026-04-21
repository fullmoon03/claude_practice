import React, { useState } from 'react';
import { useTodoStore } from '../hooks/useTodoStore';

const CategoryManager: React.FC = () => {
  const { categories, createCategory, deleteCategory } = useTodoStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3B82F6' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      await createCategory(newCategory);
      setNewCategory({ name: '', color: '#3B82F6' });
      setIsOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('이 카테고리를 삭제하시겠습니까?')) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">카테고리 관리</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          {isOpen ? '닫기' : '추가'}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mb-4 p-3 bg-gray-50 rounded">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="카테고리 이름"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
              className="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              저장
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
            style={{
              backgroundColor: category.color + '20',
              border: `1px solid ${category.color}`,
            }}
          >
            <span style={{ color: category.color }}>{category.name}</span>
            <span className="text-xs text-gray-600">
              ({category._count?.todos || 0})
            </span>
            <button
              onClick={() => handleDelete(category.id)}
              className="ml-1 text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-gray-500">카테고리가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
