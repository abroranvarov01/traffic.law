import { NextResponse } from "next/server";

let locales = ["en", "ru", "uz"];
const defaultLocale = "uz";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host");

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (host === "trafficlegal.uz" || host === "www.trafficlegal.uz") {
    return NextResponse.redirect(
      new URL(`https://traffic.law${pathname}`, request.url),
      301
    );
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const redirectUrl = new URL(
    `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
    request.url,
  );

  return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};