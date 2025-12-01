import styles from './Skeleton.module.css';
import clsx from 'classnames';

interface SkeletonProps {
  height?: number;
  className?: string;
}

export const Skeleton = ({ height = 80, className }: SkeletonProps) => {
  return <div className={clsx(styles.skeleton, className)} style={{ height }} />;
};
