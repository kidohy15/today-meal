export { default } from "next-auth/middleware";

export const config = {
  marcher: ["/recipe/new", "/recipe/:id/edit", "/users/likes","/users/mypage"]
}