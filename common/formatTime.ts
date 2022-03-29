import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale('es');
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const dateFromNow = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
) => dayjs(date).fromNow();

export const localizedFormatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
) => dayjs(date).format('LLLL');

export const formatDateTime = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  utc = false,
) => {
  if (utc) return dayjs.utc(date).local().format('DD/MM/YYYY hh:mm a');
  return dayjs(date).format('DD/MM/YYYY hh:mm a');
};

export const formatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  utc = false,
) => {
  if (utc) return dayjs.utc(date).local().format('DD/MM/YYYY');
  return dayjs(date).format('DD/MM/YYYY');
};
