import { DATE_FORMAT } from '@/constant';
import dayjs from 'dayjs';

export const formatDate = (date: Date) => {
  return dayjs(date).format(DATE_FORMAT);
};
