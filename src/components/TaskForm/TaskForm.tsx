import { useMemo, useState } from 'react';
import styles from './TaskForm.module.css';
import type { Task, TaskPayload } from '../../types/task';
import { Loader } from '../Loader/Loader';

interface TaskFormProps {
  onSubmit: (payload: TaskPayload) => Promise<void> | void;
  initialTask?: Task | null;
  onCancelEdit?: () => void;
  isSubmitting?: boolean;
}

const defaultState: TaskPayload = {
  title: '',
  description: '',
  completed: false,
};

export const TaskForm = ({ onSubmit, initialTask, onCancelEdit, isSubmitting = false }: TaskFormProps) => {
  const snapshot = useMemo<TaskPayload>(() => {
    if (initialTask) {
      return {
        title: initialTask.title,
        description: initialTask.description,
        completed: initialTask.completed,
      };
    }
    return defaultState;
  }, [initialTask]);

  const [values, setValues] = useState<TaskPayload>(snapshot);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, completed: event.target.checked }));
  };

  const handleReset = () => {
    setValues(snapshot);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.title.trim()) {
      return;
    }
    await onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      completed: values.completed,
    });
    if (!initialTask) {
      setValues(defaultState);
    }
  };

  const isEditMode = Boolean(initialTask);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label htmlFor="title">Заголовок*</label>
        <input
          id="title"
          name="title"
          placeholder="Например, подготовить демо"
          value={values.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          placeholder="Расскажи, что должно быть сделано"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <label className={styles.checkboxRow}>
        <input type="checkbox" checked={values.completed} onChange={handleCheckbox} />
        Задача выполнена
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryBtn} disabled={isSubmitting}>
          {isSubmitting && <Loader variant="button" />}
          {isEditMode ? 'Сохранить изменения' : 'Добавить задачу'}
        </button>
        <button type="button" className={styles.secondaryBtn} onClick={handleReset} disabled={isSubmitting}>
          Сбросить
        </button>
        {isEditMode && onCancelEdit ? (
          <button type="button" className={styles.secondaryBtn} onClick={onCancelEdit} disabled={isSubmitting}>
            Завершить редактирование
          </button>
        ) : null}
      </div>
    </form>
  );
};
