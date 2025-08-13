import { ElLoading, ElMessage, ElNotification } from "element-plus";
import type { LoadingInstance } from "element-plus/es/components/loading/src/loading.mjs";
import nprogress from "nprogress";

class Notify {
  private static loading: LoadingInstance | null = null;

  /**
   * 显示用户消息
   * @param {string} message 消息
   * @param {messageTypes} type 类型
   */
  static showMessage(message: string, type: "success" | "info" | "warning" | "error" = "success") {
    ElMessage({ message, type });
  }

  /**
   * 系统通知
   * @param {*} message 通知内容
   * @param {*} type 通知类型
   * @param {*} dangerouslyUseHTMLString 是否支持HTML渲染
   */
  static showNotification(message: string, type: "success" | "info" | "warning" | "error" = "success", dangerouslyUseHTMLString: boolean = true) {
    ElNotification({ message, type, dangerouslyUseHTMLString, duration: 1500 });
  }

  /**
   * 显示Loading
   * @param {string} message
   */
  static showLoading(message: string) {
    this.loading = ElLoading.service({
      lock: true,
      text: message,
      background: "rgba(0, 0, 0, 0.31)"
    });
  }

  /**
   * 隐藏Loading
   */
  static closeLoading() {
    this.loading?.close();
  }

  /**
   * 显示加载条
   */
  static showFullLoading() {
    nprogress.start();
  }

  /**
   * 隐藏加载条
   */
  static hideFullLoading() {
    nprogress.done();
  }
}

export default Notify;
