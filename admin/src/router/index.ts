import Cookie from "@/utils/cookie";
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
    component: () => import("@/layouts/Main.vue"),
    children: [
      {
        name: "博客管理",
        path: "/blog/list",
        component: () => import("@/views/blog/BlogList.vue")
      },

      {
        name: "博客分类",
        path: "/blog/category",
        component: () => import("@/views/blog/BlogCategory.vue")
      },
      {
        name: "编辑博客",
        path: "/blog/edit",
        component: () => import("@/views/blog/BlogEdit.vue")
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.name as string + "- 后台管理系统";

  if (to.path !== "/login") {
    const token = Cookie.get("token");
    if (!token) {
      return next({ path: "/login" });
    }
  }

  next();
});


export default router;
