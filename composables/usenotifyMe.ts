const options: NotificationOptions = {
  dir: "auto", // 文字方向
  requireInteraction: false, // 不自动关闭通知
  icon: "/image/logo2.png",
};
/**
 *
 * @param title 通知栏标题
 * @param options 配置项
 * @param clickCall 窗口点击回调函数
 */
function notifyMe(
  title: string,
  options: NotificationOptions,
  clickCall?: Function
) {
  // 先检查浏览器是否支持
  if (!window.Notification) {
    console.log("浏览器不支持通知");
  } else {
    // 检查用户曾经是否同意接受通知
    if (Notification.permission === "granted") {
      var notification = new Notification(title, options); // 显示通知
    } else if (Notification.permission === "default") {
      // 用户还未选择，可以询问用户是否同意发送通知
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          var notification = new Notification(title, options); // 显示通知
          notification.onclick = () => {
            //窗口回调
            if (clickCall) {
              clickCall();
            }
          };
        }
      });
    } else {
      // denied 用户拒绝
      console.log("用户曾经拒绝显示通知");
    }
  }
}
/**
 *
 * @param title 通知标题
 * @param content 通知内容
 * @param CallBack 点击回调
 */
export function useNotify(title: string, content: string, CallBack: Function) {
  notifyMe(
    "未来软件工作室",
    {
      dir: "auto", // 文字方向
      requireInteraction: false, // 自动关闭通知
      icon: "/image/logo2.png",
      body: content,
    },
    CallBack
  );
}
