import { useState } from 'react';
import styles from './App.module.css';
import './styles/globals.css';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { FilterBar } from './components/FilterBar/FilterBar';
import { Loader } from './components/Loader/Loader';
import { useTasks } from './hooks/useTasks';
import type { Task } from './types/task';

function App() {
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    search,
    setSearch,
    sort,
    setSort,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formPending, setFormPending] = useState(false);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);

  const handleFormSubmit = async (payload: { title: string; description: string; completed: boolean }) => {
    setFormPending(true);
    try {
      if (editingTask) {
        await updateTask(editingTask.id, {
          ...editingTask,
          ...payload,
          isUpdated: true,
        });
        setEditingTask(null);
      } else {
        await createTask(payload);
      }
    } finally {
      setFormPending(false);
    }
  };

  const handleToggle = async (task: Task) => {
    setPendingTaskId(task.id);
    try {
      await updateTask(task.id, {
        completed: !task.completed,
        isUpdated: true,
      });
    } finally {
      setPendingTaskId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setPendingTaskId(id);
    try {
      await deleteTask(id);
    } finally {
      setPendingTaskId(null);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>TODO List</h1>
      </header>

      <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      <main className={styles.layout}>
        <TaskForm
          key={(editingTask?.id ?? 'create')}
          onSubmit={handleFormSubmit}
          initialTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
          isSubmitting={formPending}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggle={handleToggle}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          pendingTaskId={pendingTaskId}
        />
      </main>

      {formPending && <Loader />}
    </div>
  );
}

export default App;
