import { ElMessage } from "element-plus";

export default class Notify {
  static showMessage(message, type = "success") {
    ElMessage({
      message: message,
      type: type,
      duration: 3000
    });
  }
}
