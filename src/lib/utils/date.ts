import { format, parseISO, isValid } from 'date-fns';
import { vi } from 'date-fns/locale';

export function parseDate(dateStr: string | number | Date | null | undefined): Date {
  if (!dateStr) return new Date();
  if (dateStr instanceof Date) return isValid(dateStr) ? dateStr : new Date();
  if (typeof dateStr === 'number') return new Date(dateStr);
  try {
    const parsedDate = parseISO(dateStr);
    return isValid(parsedDate) ? parsedDate : new Date();
  } catch {
    return new Date();
  }
}

export function formatDate(date: string | number | Date | null | undefined): string {
  const parsedDate = parseDate(date);
  try {
    return format(parsedDate, 'dd MMMM yyyy', { locale: vi });
  } catch {
    return format(new Date(), 'dd MMMM yyyy', { locale: vi });
  }
}

export function formatDatetime(date: string | number | Date | null | undefined): string {
  const parsedDate = parseDate(date);
  try {
    return format(parsedDate, 'dd MMMM yyyy HH:mm', { locale: vi });
  } catch {
    return format(new Date(), 'dd MMMM yyyy HH:mm', { locale: vi });
  }
}

export function formatTime(date: string | number | Date | null | undefined): string {
  const parsedDate = parseDate(date);
  try {
    return format(parsedDate, 'HH:mm', { locale: vi });
  } catch {
    return format(new Date(), 'HH:mm', { locale: vi });
  }
}

export function isValidDate(date: string | number | Date | null | undefined): boolean {
  if (!date) return false;
  if (date instanceof Date) return isValid(date);
  try {
    const parsedDate = parseISO(String(date));
    return isValid(parsedDate);
  } catch {
    return false;
  }
}

export function toISOString(date: string | number | Date | null | undefined): string {
  const parsedDate = parseDate(date);
  try {
    return parsedDate.toISOString();
  } catch {
    return new Date().toISOString();
  }
}
