import { Priority } from '../types';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'LOW':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getPriorityLabel = (priority: Priority): string => {
  switch (priority) {
    case 'HIGH':
      return '높음';
    case 'MEDIUM':
      return '보통';
    case 'LOW':
      return '낮음';
    default:
      return priority;
  }
};

export const formatDueDate = (dueDate?: string): string => {
  if (!dueDate) return '';

  const date = parseISO(dueDate);

  if (isToday(date)) return '오늘';
  if (isTomorrow(date)) return '내일';

  return format(date, 'yyyy-MM-dd');
};

export const isDueDatePast = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  return isPast(parseISO(dueDate)) && !isToday(parseISO(dueDate));
};

export const isDueDateSoon = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  const date = parseISO(dueDate);
  return isToday(date) || isTomorrow(date);
};
