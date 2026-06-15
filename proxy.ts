import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, hasCourseAccess } from "@/lib/access";

const protectedPrefixes = ["/dashboard", "/chapter", "/video"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;

  if (hasCourseAccess(accessToken)) {
    return NextResponse.next();
  }

  const accessUrl = request.nextUrl.clone();
  accessUrl.pathname = "/access";
  accessUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(accessUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/chapter/:path*", "/video/:path*"]
};
