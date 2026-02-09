import { NextResponse } from "next/server";

let locales = ["en", "ru", "uz"];
const defaultLocale = "uz";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Statik fayllarni o'tkazib yuborish (MUHIM!)
  // Bu qism rasm, shrift va faviconlarni middleware-dan himoya qiladi
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // rasm.jpg, favicon.ico kabilarni tutadi
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Pathda til bormi yoki yo'qligini tekshirish
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 3. Agar til bo'lmasa, defaultLocale ga yo'naltirish
  // URL-ni to'g'ri yasash (double slash bo'lib ketmasligi uchun)
  const redirectUrl = new URL(
    `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
    request.url,
  );

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // Statik fayllarni matcher darajasida ham cheklaymiz
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
