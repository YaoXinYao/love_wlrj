import { useDiskstore } from "~/store/disk";
export async function startUpload(
  file: File,
  currentChunk: number,
  md5: string,
  uploadname: string,
  curTag: number[]
) {
  const diskstore = useDiskstore();
  // 分片，每片10Mb
  const chunkSize = 1024 * 1024 * 5; // 10MB
  const name = file.name;
  const Size = file.size;
  const shardCount = Math.ceil(file.size / chunkSize);
  async function uploadNextChunk() {
    // 新建XHR 请求
    const xhr = new XMLHttpRequest();
    // 分片开始的地方
    const startByte = currentChunk * chunkSize;
    // 分片结束的地方
    const endByte = Math.min(startByte + chunkSize, file.size);
    const chunk = file.slice(startByte, endByte);
    const form = new FormData();
    form.append("file", chunk); //slice方法用于切出文件的一部分
    curTag.forEach((item) => {
      form.append("fileTypeIdList", item as any);
    });
    form.append("fileName", name);
    form.append("uploaderId", Authuserid() as any);
    form.append("uploaderName", uploadname);
    form.append("totalSize", Size as any);
    form.append("total", shardCount as any); //总片数
    form.append("index", currentChunk as any); //当前是第几片
    form.append("md5", md5);
    // 开始发送
    try {
      const response = await uploadChunk(xhr, form);
      const { flag, code, message } = JSON.parse(response as string);
      if (code == 21000) {
        //大文件已经传过的判断
        if (
          code == 21000 &&
          currentChunk == 0 &&
          chunk.size > 1024 * 1024 * 5
        ) {
          diskstore.updateChunk(shardCount);
          ElMessage({ message: `该文件已经上传过`, type: "success" });
        } else {
          diskstore.updatereadyByte(1); //加一片
          ElMessage({ message: `${name}上传完成`, type: "success" });
        }
        //上传完成
        return;
      }
      if (code == 20000) {
        currentChunk++;
        /**
         * 更新正在上传第几片
         */
        diskstore.updateChunk(currentChunk);
        diskstore.updatereadyByte(1); //加一片
        await uploadNextChunk();
      }
    } catch (error) {
      //如果出现错误，则重新上传本片
      setTimeout(async () => {
        await uploadNextChunk();
      }, 1000);
    }
  }
  //  上传单片
  async function uploadChunk(xhr: XMLHttpRequest, formData: FormData) {
    return new Promise((resolve, reject) => {
      xhr.open("POST", "/api/disk/file/shardingUpload", true);
      xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
        }
      };
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`上传失败: ${xhr.statusText}`));
        }
      };
      xhr.onerror = function () {
        reject(new Error("上传发生错误"));
      };
      xhr.send(formData);
    });
  }
  await uploadNextChunk();
}
