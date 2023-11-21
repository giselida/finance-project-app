export function convertStringDate(date: string) {
  return new Date(date.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, "$2-$1-$3"));
}
