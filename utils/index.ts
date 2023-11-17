export function escapeMarkdown(text: string): string {
  // List of special characters in Markdown syntax
  const specialChars = /[\\`*_{}[\]()#+\-.!]/g;
  return text.replace(specialChars, "\\$&");
}
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: NodeJS.Timeout;

  return function (this: any, ...args: Parameters<T>) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
