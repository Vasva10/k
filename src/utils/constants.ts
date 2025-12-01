import type { TaskStatusFilter, TaskSort } from '../types/task';

export const FILTER_OPTIONS: Array<{ label: string; value: TaskStatusFilter }> = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Выполненные', value: 'completed' },
];

export const SORT_OPTIONS: Array<{ label: string; value: TaskSort }> = [
  { label: 'Сначала новые', value: 'newest' },
  { label: 'Сначала старые', value: 'oldest' },
  { label: 'По названию', value: 'title' },
  { label: 'По статусу', value: 'status' },
];
