import { requestObj } from "../config";
import { getWebsocketUrl } from "../utils";
import { ref } from "vue";
interface MessageInfo {
  role: string;
  content: string;
}
const chatList = ref<MessageInfo[]>([
  { role: "user", content: requestObj.context },
  { role: "assistant", content: "我是AI助手" },
]);
const answer = ref<string>("");
const loading = ref(false);
const error = ref<string>("");
async function fetchAnswer(question: string) {
  // 模拟网络延迟
  answer.value = "";
  // 获取请求地址
  let myUrl = await getWebsocketUrl();
  // 获取输入框中的内容
  // 每次发送问题 都是一个新的websocket请求
  let socket = new WebSocket(myUrl);
  // 监听websocket的各阶段事件 并做相应处理
  socket.addEventListener("open", (event) => {
    loading.value = true;
    // 发送消息
    let params = {
      header: {
        app_id: requestObj.APPID,
        uid: "wzz",
      },
      parameter: {
        chat: {
          domain: "generalv3",
          temperature: 0.5,
          max_tokens: 2048,
        },
      },
      payload: {
        message: {
          // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
          // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
          text: [
            ...chatList.value,
            // ....... 省略的历史对话
            { role: "user", content: question }, //# 最新的一条问题，如无需上下文，可只传最新一条问题
          ],
        },
      },
    };
    socket.send(JSON.stringify(params));
  });
  socket.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    if (!data.payload) {
      socket.close();
      return;
    }
    answer.value += data.payload.choices.text[0].content;
    // respondHoodle(result);
    if (data.header.code !== 0) {
      console.log("出错了", data.header.code, ":", data.header.message);
      // 出错了"手动关闭连接"
      socket.close();
    }
    if (data.header.code === 0) {
      // 对话已经完成
      if (data.payload.choices.text && data.header.status === 2) {
        setTimeout(() => {
          // "对话完成，手动关闭连接"
          socket.close();
        }, 1000);
      }
    }
  });
  socket.addEventListener("close", (event) => {
    chatList.value = [
      ...chatList.value,
      { role: "user", content: question },
      { role: "assistant", content: answer.value },
    ];
    loading.value = false;
    error.value = "";
    // 对话完成后socket会关闭，将聊天记录换行处理
  });
  socket.addEventListener("error", (event) => {
    error.value = "获取回答时发生错误";
    console.log("连接发送错误！！", event);
  });
}
export function useAiTool() {
  function getAnswer(question: string) {
    fetchAnswer(question);
    // answer.value = question;
    // console.log(chatList.value);
  }
  return {
    answer,
    loading,
    error,
    getAnswer,
  };
}
