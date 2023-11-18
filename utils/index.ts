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
export const exportFile = (
  data: string,
  fileName: string,
  _this?: any
): void => {
  // 地址不存在时，禁止操作
  if (!data) return;
  // 提取文件后缀的正则表达式
  const extensionPattern = /\.([a-zA-Z0-9]+)$/;
  const match = fileName.match(extensionPattern);
  const fileExtension = match ? match[1] : "";
  // 下载文件并保存到本地
  const callback = (data: Blob): void => {
    // 创建a标签，使用 html5 download 属性下载
    const link = document.createElement("a");
    // 创建url对象
    const objectUrl = window.URL.createObjectURL(new Blob([data]));
    link.style.display = "none";
    link.href = objectUrl;
    // 自定义文件名称， fileName
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    // 适当释放url
    window.URL.revokeObjectURL(objectUrl);
  };
  // 把接口返回的url地址转换为 blob
  const xhr = new XMLHttpRequest();
  xhr.open("get", data, true);
  xhr.responseType = "blob";
  xhr.onload = (): void => {
    // 返回文件流，进行下载处理
    callback(xhr.response);
  };
  xhr.send(); // 不要忘记发送
};
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    // 使用 Clipboard API 将文本复制到剪贴板
    const newtext = `@未来软件所有：
    ${text}`;
    await navigator.clipboard.writeText(newtext);
    ElMessage({ message: "复制连接成功", type: "success" });
  } catch (err) {
    ElMessage({ message: "复制连接失败", type: "error" });
  }
};
