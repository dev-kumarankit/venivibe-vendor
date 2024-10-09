import { parse } from 'date-fns';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatDateOfBirthDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


export function formatDOB(dob: string): string {
  const parsedDob = parse(dob, 'dd/MM/yyyy', new Date());
  const day = parsedDob.getDate();
  const month = parsedDob.toLocaleString('default', { month: 'long' });
  const year = parsedDob.getFullYear();

  return `${day} ${month} ${year}`;
}


export const getTodayUTCDate = (): string => {
  const date = new Date();
  const utcDate = date.toISOString().slice(0, 10);
  return utcDate;
};

export const formatUTCDate = (utcDate: string) => {
  // Parse the UTC date string
  const utcDayjs = dayjs.utc(utcDate);

  // Convert to the user's local timezone
  const localDayjs = utcDayjs.local();

  // Format the date string as desired
  const formattedDate = localDayjs.format('DD MMM YYYY');

  return formattedDate;
};