import Cookies from "js-cookie";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "登录",
    path: "/login",
    component: () => import("@/views/Login.vue")
  },
  {
    name: "首页",
    path: "/",
    component: () => import("@/layouts/Main.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const token = Cookies.get("token");
    if (token) {
      next();
    } else {
      next({ path: "/login" });
    }
    return;
  }

  next();
});

export default router;
