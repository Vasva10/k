export type TaskStatusFilter = 'all' | 'active' | 'completed';

export type TaskSort = 'newest' | 'oldest' | 'title' | 'status';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isUpdated: boolean;
}

export interface TaskPayload {
  title: string;
  description: string;
  completed: boolean;
}
