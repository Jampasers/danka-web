// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Daftar rute publik (boleh diakses tanpa login)
const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const { pathname } = request.nextUrl;

  // Jika sudah login → redirect dari halaman auth ke homepage
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Jika belum login & akses halaman protected → redirect ke login
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
