export function dateFormat(originalDate: any): string {
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");
  const hours = String(originalDate.getHours()).padStart(2, "0");
  const minutes = String(originalDate.getMinutes()).padStart(2, "0");
  const seconds = String(originalDate.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}
export function dateFormatReverse(originalDate: any): any {
  return new Date(
    originalDate.getFullYear(),
    originalDate.getMonth(),
    originalDate.getDate(),
    originalDate.getHours(),
    originalDate.getMinutes()
  );
}
