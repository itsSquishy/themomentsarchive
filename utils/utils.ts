import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return ''; // Return empty string if dateString is undefined

  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript

  // Format the date using Intl.DateTimeFormat
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}