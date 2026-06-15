import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  ACCESS_COOKIE_VALUE,
  verifyAccessCode
} from "@/lib/access";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const code = String(formData.get("code") ?? "");
  const requestedNext = String(formData.get("next") ?? "/dashboard");
  const nextPath = requestedNext.startsWith("/") ? requestedNext : "/dashboard";

  if (!verifyAccessCode(code)) {
    const accessUrl = new URL("/access", request.url);
    accessUrl.searchParams.set("error", "invalid");
    accessUrl.searchParams.set("next", nextPath);

    return NextResponse.redirect(accessUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), { status: 303 });
  response.cookies.set(ACCESS_COOKIE, ACCESS_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 120
  });

  return response;
}
