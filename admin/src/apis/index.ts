import request from "@/utils/request";

export default class API {
  static uploadImage(form: FormData) {
    return request.post("/upload", form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  static login(data: { account: string; password: string; checkCode: string; }) {
    return request.post("/user/login", data);
  }

  // ======================================= 分类管理 ========================================
  static getBlogCategoryList() {
    return request.get("/category?skip=0&take=1000");
  }

  static createBlogCategory(data: any) {
    return request.post("/category", data);
  }

  static updateBlogCategory(data: any) {
    return request.patch("/category", data);
  }
  static deleteBlogCategory(id: number) {
    return request.delete("/category/" + id);
  }

  static getBlogCategoryOptions() {
    return request.get("/category/options");
  }

  // ======================================= 博客管理 ========================================
  static getBlogDetail(id: string) {
    return request.get(`/blog/${id}`);
  }
  static getBlogList(params: any) {
    return request.get("/blog", { params });
  }
  static createBlog(data: any) {
    return request.post("/blog", data);
  }
  static updateBlog(data: any) {
    return request.patch("/blog", data);
  }
  static deleteBlog(id: number) {
    return request.delete("/blog", { params: { id } });
  }
}