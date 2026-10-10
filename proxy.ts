import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type UserRole = "ADMIN" | "MODERATOR" | "PROVIDER" | "CUSTOMER";

type JwtPayload = {
  role?: UserRole;
  userRole?: UserRole;
  data?: {
    role?: UserRole;
  };
  user?: {
    role?: UserRole;
  };
  exp?: number;
  [key: string]: unknown;
};

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/about-us", "/equipments"];
const ROLE_HOME: Record<UserRole, string> = {
  ADMIN: "/admin",
  MODERATOR: "/",
  PROVIDER: "/provider",
  CUSTOMER: "/user",
};

const ROLE_ROUTES: Array<{ prefix: string; role: UserRole }> = [
  { prefix: "/admin", role: "ADMIN" },
  { prefix: "/provider", role: "PROVIDER" },
  { prefix: "/user", role: "CUSTOMER" },
  { prefix: "/moderator", role: "MODERATOR" },
];

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  return atob(padded);
}

function decodeToken(token: string | undefined): JwtPayload | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(parts[1])) as JwtPayload;

    if (typeof payload.exp === "number" && payload.exp <= Date.now() / 1000) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function getUserRole(payload: JwtPayload | null): UserRole | null {
  const role =
    payload?.role ??
    payload?.userRole ??
    payload?.data?.role ??
    payload?.user?.role;

  return role && ["ADMIN", "MODERATOR", "PROVIDER", "CUSTOMER"].includes(role)
    ? role
    : null;
}

function isRouteMatch(pathname: string, route: string) {
  return route === "/"
    ? pathname === "/"
    : pathname === route || pathname.startsWith(`${route}/`);
}

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => isRouteMatch(pathname, route));
}

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => isRouteMatch(pathname, route));
}

async function refreshAccessToken(refreshToken: string) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) return null;

  try {
    const response = await fetch(`${apiBaseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${encodeURIComponent(refreshToken)}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = (await response.json()) as {
      data?: { accessToken?: string };
      accessToken?: string;
    };

    return result.data?.accessToken ?? result.accessToken ?? null;
  } catch {
    return null;
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (redirectTo !== "/login") {
    loginUrl.searchParams.set("redirectTo", redirectTo);
  }

  return NextResponse.redirect(loginUrl);
}

function continueWithToken(request: NextRequest, accessToken?: string) {
  if (!accessToken) return NextResponse.next();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "cookie",
    `${request.cookies
      .getAll()
      .filter(({ name }) => name !== "accessToken")
      .map(({ name, value }) => `${name}=${value}`)
      .concat(`accessToken=${accessToken}`)
      .join("; ")}`,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

function redirectWithToken(
  request: NextRequest,
  destination: string,
  accessToken?: string,
) {
  const response = NextResponse.redirect(new URL(destination, request.url));

  if (accessToken) {
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let currentAccessToken = accessToken;
  let payload = decodeToken(currentAccessToken);

  if (!payload && refreshToken) {
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (newAccessToken) {
      currentAccessToken = newAccessToken;
      payload = decodeToken(newAccessToken);
    }
  }

  const userRole = getUserRole(payload);
  const hasSessionCookie = Boolean(currentAccessToken || refreshToken);
  const isAuthenticated = Boolean(payload || hasSessionCookie);
  const matchedRoleRoute = ROLE_ROUTES.find(({ prefix }) =>
    isRouteMatch(pathname, prefix),
  );

  if (isAuthRoute(pathname) && isAuthenticated) {
    return redirectWithToken(
      request,
      userRole ? ROLE_HOME[userRole] : "/",
      currentAccessToken,
    );
  }

  if (!isAuthenticated && !isPublicRoute(pathname) && !isAuthRoute(pathname)) {
    return redirectToLogin(request);
  }

  if (matchedRoleRoute && userRole !== matchedRoleRoute.role) {
    if (!isAuthenticated) return redirectToLogin(request);

    return NextResponse.redirect(
      new URL(userRole ? ROLE_HOME[userRole] : "/", request.url),
    );
  }

  return continueWithToken(
    request,
    isAuthenticated ? currentAccessToken : undefined,
  );
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};
