export { default } from "next-auth/middleware";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ["/recipe/new", "/recipe/:id/edit", "/users/likes", "/users/mypage"],
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth/signin')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}