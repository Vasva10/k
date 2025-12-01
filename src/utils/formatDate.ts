import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export const formatDateTime = (iso: string) => {
  return dayjs(iso).format('DD MMM YYYY, HH:mm');
};

export const formatRelative = (iso: string) => {
  const diffHours = dayjs().diff(dayjs(iso), 'hour');
  if (diffHours < 24) {
    return dayjs(iso).fromNow();
  }
  return formatDateTime(iso);
};
