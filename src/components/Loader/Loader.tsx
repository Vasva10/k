import styles from './Loader.module.css';
import clsx from 'classnames';

interface LoaderProps {
  variant?: 'overlay' | 'inline' | 'button';
}

export const Loader = ({ variant = 'overlay' }: LoaderProps) => {
  if (variant === 'inline') {
    return <span className={clsx(styles.spinner, styles.inline)} aria-label="Загрузка" />;
  }

  if (variant === 'button') {
    return <span className={clsx(styles.spinner, styles.button)} aria-hidden="true" role="presentation" />;
  }

  return (
    <div className={styles.overlay} role="status" aria-label="Загрузка">
      <span className={styles.spinner} />
    </div>
  );
};
