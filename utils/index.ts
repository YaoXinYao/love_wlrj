import SparkMD5 from "spark-md5";
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
//文件下载，进度监视
export const exportFile = async (
  data: string | null | undefined,
  fileName: string,
  progressCallback?: (progress: number, speed: number) => void, // 新增的进度回调参数，包含速度
  SizeCall?: (Totalsize: string) => void
): Promise<void> => {
  try {
    if (!data) {
      throw new Error("No data provided for file export.");
    }

    const response = await fetch(data);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const extensionPattern = /\.([a-zA-Z0-9]+)$/;
    const match = fileName.match(extensionPattern);
    const fileExtension = match ? match[1] : "";

    const reader = response.body!.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = 0;
    let startTime = performance.now(); // 记录下载开始时间
    const len = response.headers.get("content-length");
    if (SizeCall) {
      SizeCall(len as string);
    }
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      loaded += value ? value.length : 0;
      // 计算进度
      const totalLength = parseInt(
        response.headers.get("content-length") || "0",
        10
      );
      const progress = (loaded / totalLength) * 100;

      // 计算下载速度
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTime) / 1000; // 转换为秒
      const speed = loaded / elapsedTime; // 下载速度，单位是字节/秒

      // 调用回调函数
      if (progressCallback) {
        progressCallback(progress, speed);
      }
    }

    const blob = new Blob(chunks, {
      type: response.headers.get("Content-Type") || "application/octet-stream",
    });

    const link = document.createElement("a");
    const objectUrl = window.URL.createObjectURL(blob);

    link.style.display = "none";
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // 等待一段时间，确保浏览器处理下载
    setTimeout(() => {
      document.body.removeChild(link);
      // 适当释放 URL 对象
      window.URL.revokeObjectURL(objectUrl);
    }, 1000); // 可以根据需要调整等待的时间
  } catch (error) {
    console.error("Error during file export:", error);
    // 在实际应用中，你可能希望提供用户有关错误的更详细信息
    throw error; // 如果需要拒绝 Promise，将错误重新抛出
  }
};
// 复制到粘贴板
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
//匹配后缀
export function filetype2(val: string) {
  const reg = /\.([a-zA-Z0-9]+)$/;
  return val.match(reg)![1];
}
interface IUploadProgress {
  loaded: number;
  total: number;
}
//废弃
export function uploadFileWithProgress(
  url: string,
  file: File,
  onProgress: (progress: IUploadProgress) => void
): Promise<Response> {
  const formData = new FormData();
  formData.append("file", file);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": Authtoken(),
      },
    }).then(
      (response) => {
        if (!response.ok) {
          reject(
            new Error(`Failed to upload file with status: ${response.status}`)
          );
          return;
        }

        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );

    // 如果浏览器支持 ReadableStream，就可以获取上传进度
    if ("ReadableStream" in window) {
      const reader = new Response(file).body?.getReader();
      let totalBytes = 0;
      let bytesUploaded = 0;

      function read() {
        reader!.read().then(({ done, value }) => {
          if (done) {
            // 上传完成
            onProgress({ loaded: totalBytes, total: totalBytes });
            return;
          }

          // 累加已上传字节数
          bytesUploaded += value.byteLength;
          // 通知上传进度
          onProgress({ loaded: bytesUploaded, total: totalBytes });

          // 继续读取下一块
          read();
        });
      }

      // 计算文件总字节数
      totalBytes = file.size;

      // 开始读取
      read();
    } else {
      // 浏览器不支持 ReadableStream，无法获取上传进度
      console.warn(
        "The browser does not support ReadableStream. Unable to track upload progress."
      );
    }
  });
}
// 字节 --->  合适的单位
export function convertFileSize(bytes: number) {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const base = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(base));
  const convertedSize = (bytes / Math.pow(base, i)).toFixed(2);
  if (isNaN(Number(convertedSize)) || !sizes[i]) {
    return ""; // 返回空字符串
  }

  return `${convertedSize} ${sizes[i]}`;
}
//文件分片,分片，生成md5
export function createChunks(file: File, chunkSize: number) {
  const result = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    const temp = file.slice(i, i + chunkSize);
    result.push(temp);
  }
  return result;
}
//生成文件的hash MD5
export function HashMd5file(chunks: Blob[]) {
  return new Promise((resolve) => {
    const spark = new SparkMD5();
    function _read(i: number) {
      if (i >= chunks.length) {
        resolve(spark.end());
      }
      const blob = chunks[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        const bytes = e.target?.result;
        spark.append(bytes as string);
        _read(i + 1);
      };
      reader.readAsArrayBuffer(blob);
    }
    _read(0);
  });
}
