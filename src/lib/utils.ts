// Library imports
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  format,
  formatRelative,
  isBefore,
  isSameYear,
  isToday,
  isTomorrow,
  startOfToday,
} from "date-fns";
import { redirect } from "react-router";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Formats a given date into a human-readable string.
 * - If the date is "Yesterday", "Today", "Tomorrow", or a weekday (e.g., "Monday"), it returns that label.
 * - If the date is within the current year, it returns a short format (e.g., "12 Mar").
 * - Otherwise, it returns a full format with the year (e.g., "12 Mar 2024").
 *
 * @param {Date | number | string} date - The date to format (can be a Date object, timestamp, or date string).
 * @returns {string} A formatted date string or relative day label.
 */
export function getFormattedDateLabel(date: Date | number | string): string {
  const today = new Date();

  const relativeDay = toTitleCase(formatRelative(date, today).split(" at ")[0]);
  const relativeDays = [
    "Yesterday",
    "Today",
    "Tomorrow",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (relativeDays.includes(relativeDay)) return relativeDay;

  if (isSameYear(date, today)) return format(date, "dd MMM");
  else return format(date, "dd MMM yyyy");
}

/**
 * Returns a Tailwind CSS text color class based on the task's due date and completion status.
 * - Overdue tasks (past due date) get a red color.
 * - Tasks due today get an emerald (green) color.
 * - Tasks due tomorrow (if not completed) get an amber (yellow) color.
 *
 * @param {Date | null} dueDate - The due date of the task.
 * @param {boolean} [completed] - Whether the task is completed.
 * @returns {string | undefined} The corresponding text color class or undefined if no styling is needed.
 */
export function getDueDateTextColor(
  dueDate: Date | null,
  completed?: boolean
): string | undefined {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return "text-red-500";
  } else if (isToday(dueDate)) {
    return "text-emerald-500";
  } else if (isTomorrow(dueDate) && !completed) {
    return "text-amber-500";
  }
}

/**
 * Retrieves the Clerk user ID from local storage.
 *
 * - If a user ID is found, it returns the retrieved value.
 * - If no user ID is found, it redirects the user to the "/auth-sync" page.
 *
 * @returns {string | Response} The user ID if found, otherwise a redirect response.
 */
export function getClerkUserId(): string | Response {
  const userId = localStorage.getItem("clerkUserId");

  if (!userId) {
    return redirect("/auth-sync");
  }

  return userId;
}
