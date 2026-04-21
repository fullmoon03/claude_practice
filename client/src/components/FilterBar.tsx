import React, { useState } from 'react';
import { useTodoStore } from '../hooks/useTodoStore';
import { Priority } from '../types';

const FilterBar: React.FC = () => {
  const { filters, setFilters, clearFilters, categories } = useTodoStore();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchInput || undefined });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    clearFilters();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <input
            type="text"
            placeholder="검색..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            value={filters.completed === undefined ? '' : filters.completed ? 'true' : 'false'}
            onChange={(e) =>
              setFilters({
                completed: e.target.value === '' ? undefined : e.target.value === 'true',
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">전체</option>
            <option value="false">미완료</option>
            <option value="true">완료</option>
          </select>
        </div>

        <div>
          <select
            value={filters.priority || ''}
            onChange={(e) => setFilters({ priority: (e.target.value as Priority) || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">모든 우선순위</option>
            <option value="HIGH">높음</option>
            <option value="MEDIUM">보통</option>
            <option value="LOW">낮음</option>
          </select>
        </div>

        <div>
          <select
            value={filters.categoryId || ''}
            onChange={(e) => setFilters({ categoryId: e.target.value || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">모든 카테고리</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          검색
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
        >
          필터 초기화
        </button>

        <div className="ml-auto flex gap-2 items-center">
          <label className="text-sm text-gray-600">정렬:</label>
          <select
            value={filters.sortBy || 'createdAt'}
            onChange={(e) =>
              setFilters({
                sortBy: e.target.value as 'createdAt' | 'dueDate' | 'priority' | 'title',
              })
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="createdAt">생성일</option>
            <option value="dueDate">마감일</option>
            <option value="priority">우선순위</option>
            <option value="title">제목</option>
          </select>

          <select
            value={filters.order || 'desc'}
            onChange={(e) => setFilters({ order: e.target.value as 'asc' | 'desc' })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="desc">내림차순</option>
            <option value="asc">오름차순</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
