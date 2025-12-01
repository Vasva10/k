import { useState } from 'react';
import styles from './TaskItem.module.css';
import { formatDateTime } from '../../utils/formatDate';
import type { Task } from '../../types/task';
import { Loader } from '../Loader/Loader';
import clsx from 'classnames';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  pending?: boolean;
}

export const TaskItem = ({ task, onToggle, onEdit, onDelete, pending = false }: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = task.description || 'Без описания';
  const isLongDescription = description.length > 160;
  const visibleDescription =
    isLongDescription && !isExpanded ? `${description.slice(0, 160).trimEnd()}…` : description;

  return (
    <article className={styles.card} aria-busy={pending}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{task.title}</h3>
          <p className={styles.description}>{visibleDescription}</p>
          {isLongDescription && (
            <button type="button" className={styles.moreBtn} onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? 'Показать меньше' : 'Показать больше'}
            </button>
          )}
        </div>
        <div className={styles.badges}>
          <span className={clsx(styles.badge, task.completed && styles.badgeSuccess)}>
            {task.completed ? 'Готово' : 'В работе'}
          </span>
          {task.isUpdated && <span className={clsx(styles.badge, styles.badgeWarning)}>Обновлена</span>}
        </div>
      </div>

      <div className={styles.meta}>
        <span>Создана: {formatDateTime(task.createdAt)}</span>
        <span>Обновлена: {formatDateTime(task.updatedAt)}</span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={clsx(styles.button, styles.buttonPrimary)}
          onClick={() => onToggle(task)}
          disabled={pending}
        >
          {pending && <Loader variant="button" />}
          {task.completed ? 'Вернуть в работу' : 'Отметить выполненной'}
        </button>
        <button type="button" className={clsx(styles.button, styles.buttonGhost)} onClick={() => onEdit(task)} disabled={pending}>
          {pending && <Loader variant="button" />}
          Редактировать
        </button>
        <button type="button" className={clsx(styles.button, styles.buttonDanger)} onClick={() => onDelete(task.id)} disabled={pending}>
          {pending && <Loader variant="button" />}
          Удалить
        </button>
        {pending && <Loader variant="inline" />}
      </div>
    </article>
  );
};
