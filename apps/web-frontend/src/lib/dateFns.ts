import {
  formatDistanceToNow,
  format,
  subDays,
  parseISO,
  isBefore,
  ISOStringFormat,
} from "date-fns";

export function formatDateTime(isoString: string | ISOStringFormat) {
  const date = parseISO(isoString); // Convert ISO string to Date object
  const nineDaysAgo = subDays(new Date(), 9); // Get the date 9 days ago

  // If the date is within the last 9 days, show relative time
  if (isBefore(nineDaysAgo, date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  // Otherwise, show formatted date
  return format(date, "MMMM dd, yyyy");
}
