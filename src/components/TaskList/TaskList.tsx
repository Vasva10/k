import styles from './TaskList.module.css';
import type { Task } from '../../types/task';
import { TaskItem } from '../TaskItem/TaskItem';
import { Skeleton } from '../Skeleton/Skeleton';
import { EmptyState } from '../EmptyState/EmptyState';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  pendingTaskId?: string | null;
}

export const TaskList = ({ tasks, loading, error, onToggle, onEdit, onDelete, pendingTaskId }: TaskListProps) => {
  if (loading) {
    return (
      <div className={styles.wrapper}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <EmptyState title="Что-то пошло не так" description={error} />;
  }

  if (!tasks.length) {
    return <EmptyState title="Задач нет" description="Добавь первую задачу, чтобы начать" />;
  }

  return (
    <div className={styles.wrapper}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          pending={pendingTaskId === task.id}
        />
      ))}
    </div>
  );
};
