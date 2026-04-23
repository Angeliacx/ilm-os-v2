import { NextResponse } from "next/server";

export function middleware(request) {
  // Allow API routes, static assets, and login page
  if (
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check auth cookie
  const authCookie = request.cookies.get("ilm_auth");
  if (!authCookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validate cookie is valid base64 JSON with user info
  try {
    const decoded = JSON.parse(atob(authCookie.value));
    if (!decoded.id || !decoded.role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
