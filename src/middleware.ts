export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/recipe/new", "/recipe/:id/edit", "/users/likes", "/users/mypage"],
};

// export { default } from "next-auth/middleware"

// import { NextResponse } from "next/server";
// import { Session } from "next-auth";
// import type { NextRequest } from "next/server";
// import { getSession } from "next-auth/react";

// export async function middleware(request: NextRequest) {
//   // const session = await getSession({ req: request });

//   const session = getSession()
//     console.log("========================");
//     console.log("session", session);

//   // 로그인한 사용자인 경우 요청을 계속 진행합니다.
//   if (session) {
//     return NextResponse.next();
//   } else {
//     // 로그인되지 않은 경우, 접근을 거부하고 리디렉션합니다.
//     return NextResponse.redirect(new URL("/api/auth/signin", request.url));
//   }
// }

// export const config = {
//   matcher: ["/recipe/new", "/recipe/:id/edit", "/users/likes", "/users/mypage"],
// };

// const isLoggedIn: boolean = false;

// export function middleware(request: Request) {
//   const userIdentifier = request.headers.get("x-user-id");
//   // return NextResponse.next()

//   // if (!isLoggedIn && request.url === "http://127.0.0.1:3000/users/mypage") {
//   //   return NextResponse.redirect(new URL("/", request.url));
//   // }

//   // let cookie = request.cookie.get('my-cookie')
//   let headers = new Headers(request.headers);
//   let cookie = headers.get("cookie");

//   console.log("headers", headers);
//   console.log("cookie", headers.get("cookie"));
//   console.log("userIdentifier", userIdentifier);

//   if (cookie) {
//     return NextResponse.next();
//   }
//   return NextResponse.redirect(new URL("/", request.url));
// }
