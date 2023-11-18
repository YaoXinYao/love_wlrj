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
export const exportFile = async (
  data: string,
  fileName: string,
  _this?: any
): Promise<void> => {
  // 地址不存在时，禁止操作
  if (!data) return;

  try {
    // 发起 Fetch 请求获取文件内容
    const response = await fetch(data);

    // 检查请求是否成功
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // 提取文件后缀
    const extensionPattern = /\.([a-zA-Z0-9]+)$/;
    const match = fileName.match(extensionPattern);
    const fileExtension = match ? match[1] : "";

    // 下载文件并保存到本地
    const blob = await response.blob();

    // 创建a标签，使用 html5 download 属性下载
    const link = document.createElement("a");

    // 创建url对象
    const objectUrl = window.URL.createObjectURL(blob);

    link.style.display = "none";
    link.href = objectUrl;

    // 自定义文件名称， fileName
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // 适当释放url
    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Error during file export:", error);
    // 在实际应用中，你可能希望提供用户有关错误的更详细信息
  }
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
export function filetype2(val: string) {
  const reg = /\.([a-zA-Z0-9]+)$/;
  return val.match(reg)![1];
}
