import request from "@/utils/request";

export default class API {
  static uploadImage(form: FormData) {
    return request.post("/upload", form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  static login(data: { account: string; password: string; checkCode: string; }) {
    return request.post("/admin/login", data);
  }

  // ======================== Category ========================
  static getBlogCategoryList() {
    return request.get("/category");
  }

  static createBlogCategory(data: { name: string; icon?: string; desc?: string; }) {
    return request.post("/category", data);
  }

  static updateBlogCategory(data: { id: number; name: string; icon?: string; desc?: string; }) {
    return request.patch("/category", data);
  }
  static deleteBlogCategory(id: number) {
    return request.delete("/category/" + id);
  }


  // ======================== Blog ========================
  static getBlogList(params: { page: number; pageSize: number; categoryId?: number; title?: string; }) {
    return request.get("/blog", { params });
  }
  static createBlog(data: { title: string; desc?: string; content: string; categoryId: number; cover?: string; }) {
    return request.post("/blog", data);
  }
  static updateBlog(data: { id: number; title: string; desc?: string; content: string; categoryId: number; cover?: string; }) {
    return request.patch("/blog", data);
  }
  static deleteBlog(id: number) {
    return request.delete("/blog", { params: { id } });
  }

}