/**
 * @param {string|Date} dateString
 * @param {number} days
 * @returns {Date}
 */
export function daysBefore(dateString, days) {
  return new Date(new Date(dateString) - days * 24 * 60 * 60 * 1000);
}
