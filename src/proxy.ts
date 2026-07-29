import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { locales, defaultLocale, isLocale, NEXT_LOCALE_COOKIE, type Locale } from "@/i18n/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function detectBrowserLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    const matched = match(languages, locales, defaultLocale);
    return isLocale(matched) ? matched : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

/**
 * Locale routing: the default locale (fa) is served unprefixed at "/", every
 * other locale is served at "/<locale>". This keeps existing Persian URLs
 * unchanged while giving each additional language its own prefix - adding a
 * new locale to src/i18n/config.ts needs no changes here.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  const explicitLocale = isLocale(firstSegment) ? firstSegment : null;

  if (explicitLocale === defaultLocale) {
    // Canonicalize "/fa/..." to the unprefixed default URL so there is a single indexable URL per page.
    const url = request.nextUrl.clone();
    url.pathname = "/" + segments.slice(2).join("/");
    if (url.pathname !== "/" ) url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  if (explicitLocale) {
    const response = NextResponse.next();
    response.cookies.set(NEXT_LOCALE_COOKIE, explicitLocale, { path: "/", maxAge: COOKIE_MAX_AGE });
    return response;
  }

  const cookieLocale = request.cookies.get(NEXT_LOCALE_COOKIE)?.value;
  const savedLocale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : null;
  const targetLocale = savedLocale ?? detectBrowserLocale(request);

  if (targetLocale !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(NEXT_LOCALE_COOKIE, targetLocale, { path: "/", maxAge: COOKIE_MAX_AGE });
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);
  response.cookies.set(NEXT_LOCALE_COOKIE, defaultLocale, { path: "/", maxAge: COOKIE_MAX_AGE });
  return response;
}

export const config = {
  matcher: [
    "/((?!api|admin|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\..*).*)",
  ],
};
