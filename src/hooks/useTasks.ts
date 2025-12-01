import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TaskService } from '../services/api';
import type { Task, TaskPayload, TaskSort, TaskStatusFilter } from '../types/task';

interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: TaskStatusFilter;
  setFilter: (value: TaskStatusFilter) => void;
  search: string;
  setSearch: (value: string) => void;
  sort: TaskSort;
  setSort: (value: TaskSort) => void;
  refresh: () => Promise<void>;
  createTask: (payload: TaskPayload) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTasks = (): UseTasksResult => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskStatusFilter>('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [sort, setSort] = useState<TaskSort>('newest');
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setSearchFilter(value.trim().toLowerCase());
    }, 350);
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await TaskService.getAll();
      setTasks(data);
      setError(null);
    } catch {
      setError('Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const visibleTasks = useMemo(() => {
    const normalizedQuery = searchFilter;

    const filtered = tasks.filter((task) => {
      const matchesFilter =
        filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed);
      const matchesSearch =
        !normalizedQuery ||
        task.title.toLowerCase().includes(normalizedQuery) ||
        task.description.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          return Number(a.completed) - Number(b.completed);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return sorted;
  }, [tasks, filter, searchFilter, sort]);

  const createTask = useCallback(async (payload: TaskPayload) => {
    const newTask = await TaskService.create(payload);
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
    const updated = await TaskService.update(id, data);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await TaskService.remove(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return {
    tasks: visibleTasks,
    loading,
    error,
    filter,
    setFilter,
    search: searchInput,
    setSearch: handleSearchChange,
    sort,
    setSort,
    refresh: fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
