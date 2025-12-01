import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className={styles.wrapper}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
