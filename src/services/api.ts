import type { Task, TaskPayload } from '../types/task';

const API_URL = 'http://localhost:3000/tasks';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error('API error');
  }

  return response.json() as Promise<T>;
}

export const TaskService = {
  async getAll() {
    return request<Task[]>(API_URL);
  },
  async create(payload: TaskPayload) {
    const now = new Date().toISOString();
    return request<Task>(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        createdAt: now,
        updatedAt: now,
        isUpdated: false,
      }),
    });
  },
  async update(id: string, data: Partial<Task>) {
    return request<Task>(`${API_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }),
    });
  },
  async remove(id: string) {
    await request<void>(`${API_URL}/${id}`, { method: 'DELETE' });
  },
};
