// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Daftar rute publik (boleh diakses tanpa login)
const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password"];
const AUTH_ROUTES = ["/login", "/register"]; // Rute untuk otentikasi

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Dapatkan token dari NextAuth
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET || "default_secret_key_for_development" });

  // Jika sudah login → redirect dari halaman auth ke homepage
  if (token && AUTH_ROUTES.includes(pathname)) {
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
