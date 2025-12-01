import styles from './FilterBar.module.css';
import { FILTER_OPTIONS, SORT_OPTIONS } from '../../utils/constants';
import type { TaskSort, TaskStatusFilter } from '../../types/task';
import clsx from 'classnames';

interface FilterBarProps {
  filter: TaskStatusFilter;
  setFilter: (value: TaskStatusFilter) => void;
  search: string;
  setSearch: (value: string) => void;
  sort: TaskSort;
  setSort: (value: TaskSort) => void;
}

export const FilterBar = ({ filter, setFilter, search, setSearch, sort, setSort }: FilterBarProps) => {
  return (
    <section className={styles.wrapper} aria-label="Фильтры задач">
      <div className={styles.filters}>
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={clsx(styles.filterButton, filter === option.value && styles.filterButtonActive)}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.search}>
        <input
          type="search"
          placeholder="Поиск по заголовку"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className={styles.sort}>
        <select value={sort} onChange={(event) => setSort(event.target.value as TaskSort)}>
          {SORT_OPTIONS.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
