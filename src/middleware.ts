export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/recipe/new", "/recipe/:id/edit", "/users/likes", "/users/mypage"],
};
