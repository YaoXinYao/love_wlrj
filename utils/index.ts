import SparkMD5 from "spark-md5";
import type { FileTyperoot } from "~/types/Home";
import { sha256 } from "js-sha256";
//仅仅是工具函数，不能使用Pinia，store，不然会出现错误
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
type ThrottleFunction = (...args: any[]) => void;
// 节流
export function Mythrottle(
  func: ThrottleFunction,
  delay: number
): ThrottleFunction {
  let lastCallTime = 0;

  return function (...args: any[]) {
    const now = Date.now();

    if (now - lastCallTime >= delay) {
      func(...args);
      lastCallTime = now;
    }
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
export const copyToClipboard = async (text: string) => {
  try {
    // 检查浏览器是否支持 Clipboard API
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`@未来软件版权所有 \n${text}`);
      ElMessage({ message: "复制链接成功", type: "success" });
    } else {
      // 如果不支持，回退到使用 textarea 和 execCommand
      const textarea = document.createElement("textarea");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.value = `@未来软件版权所有 \n${text}`;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      ElMessage({ message: "复制链接成功", type: "success" });
    }
  } catch (err) {
    console.error("复制链接失败:", err);
    ElMessage({ message: "复制链接失败", type: "error" });
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
export const convertFileSize = (bytes: number) => {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const base = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(base));
  const convertedSize = (bytes / Math.pow(base, i)).toFixed(2);
  if (isNaN(Number(convertedSize)) || !sizes[i]) {
    return ""; // 返回空字符串
  }

  return `${convertedSize} ${sizes[i]}`;
};
//文件分片,分片，生成md5
export function createChunks(file: File, chunkSize: number) {
  const result: Blob[] = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    const temp = file.slice(i, i + chunkSize);
    result.push(new Blob([temp]));
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
      reader.readAsArrayBuffer(blob);
      reader.onload = (e) => {
        const bytes = e.target?.result;
        spark.append(bytes as string);
        _read(i + 1);
      };
    }
    _read(0);
  });
}
// 封装计算文件哈希值的函数
export function calculateFileHash(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      // 获取文件内容的 ArrayBuffer
      const arrayBuffer = event.target.result;

      // 使用 sha256() 计算哈希值
      const hashValue = sha256(arrayBuffer);

      // 返回计算得到的哈希值
      resolve(hashValue);
    };

    reader.onerror = (error) => {
      // 读取文件出错时，reject 错误信息
      reject(error);
    };

    // 以 ArrayBuffer 格式读取文件内容
    reader.readAsArrayBuffer(file);
  });
}
//分片上传
export async function Filefragmentation(
  file: File,
  chunkindex: number,
  md5: string,
  uploadname: string,
  curTag: number[]
) {
  const name = file.name;
  const Size = file.size;
  const shardSize = 5 * 1024 * 1024; //以5MB为一个分片,每个分片的大小
  const shardCount = Math.ceil(Size / shardSize);
  if (chunkindex >= shardCount) {
    //无需再传
    return;
  }
  const start = chunkindex * shardSize;
  const end = start + shardSize;
  const packet = file.slice(start, end);
  const form = new FormData();
  form.append("file", packet); //slice方法用于切出文件的一部分
  curTag.forEach((item) => {
    form.append("fileTypeIdList", item as any);
  });
  form.append("fileName", name);
  form.append("uploaderId", Authuserid() as any);
  form.append("uploaderName", uploadname);
  form.append("totalSize", Size as any);
  form.append("total", shardCount as any); //总片数
  form.append("index", chunkindex as any); //当前是第几片
  form.append("md5", md5);
  //数据填充完毕，开始上传
  try {
    const { data } = await useFetch<any>(
      "/disk/disk/file/shardingUploadAsync",
      {
        method: "post",
        body: form,
      }
    );
    //这个分片上传成功
    if (data.value!.code == 20000) {
      await Filefragmentation(file, chunkindex + 1, md5, uploadname, curTag);
    }
    if (data.value.code === 21000) {
      //文件已经传过了，
      return;
    }
    //单个分片失败,继续尝试上传
    if (data.value!.code === 51000) {
      setTimeout(async () => {
        await Filefragmentation(file, chunkindex, md5, uploadname, curTag);
      }, 1000);
    }
  } catch (error) {
    setTimeout(async () => {
      await Filefragmentation(file, chunkindex, md5, uploadname, curTag);
    }, 1000);
  }
}
//分片

//生成图标
export function iconfontType(val: string) {
  try {
    const filetype: FileTyperoot = val.toLocaleLowerCase() as FileTyperoot;
    if (FileType[filetype]) {
      return FileType[filetype];
    } else {
      return FileType.other;
    }
  } catch (error) {
    return FileType.other;
  }
}
// 文件类型
export function filetype(val: string) {
  try {
    const reg = /\.([a-zA-Z0-9]+)$/;
    return val.match(reg)![1];
  } catch (error) {
    return "";
  }
}
