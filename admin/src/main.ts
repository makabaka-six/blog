import { createApp } from 'vue';
import router from '@/router/index.ts';

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'virtual:windi.css';
import "@/assets/css/global.css";
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
