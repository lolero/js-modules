export function formatDateToIsoStringWithoutMilliseconds(date: Date): string {
  return `${date.toISOString().slice(0, -5)}Z`;
}
