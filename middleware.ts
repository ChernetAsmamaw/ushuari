// File: middleware.ts
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

// Routes that require specific roles
const ADMIN_ROUTES = ["/admin(.*)"];
const LEGAL_ORG_ROUTES = ["/organization(.*)"];
const USER_ROUTES = ["/dashboard(.*)"];

// Public routes (accessible without authentication)
const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
];

export async function middleware(request) {
  const { userId } = getAuth(request);
  const path = request.nextUrl.pathname;

  // Allow public routes for everyone
  if (PUBLIC_ROUTES.some((route) => path === route)) {
    return NextResponse.next();
  }

  // Allow auth routes for non-authenticated users
  if (
    (path.startsWith("/auth/sign-in") || path.startsWith("/auth/sign-up")) &&
    !userId
  ) {
    return NextResponse.next();
  }

  // If the user is authenticated and tries to access auth routes, redirect to dashboard
  if (userId && path.startsWith("/auth/") && path !== "/auth/sign-out") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is not authenticated and tries to access protected routes
  if (
    !userId &&
    (path.startsWith("/dashboard") ||
      path.startsWith("/admin") ||
      path.startsWith("/organization"))
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // For admin routes, check if user has admin role
  if (
    userId &&
    ADMIN_ROUTES.some((pattern) => new RegExp(`^${pattern}$`).test(path))
  ) {
    try {
      const user = await clerkClient.users.getUser(userId);
      const role = user?.publicMetadata?.role as string;

      if (role !== "admin") {
        // Redirect non-admin users to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      // In case of error, redirect to dashboard as a fallback
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // For legal organization routes, check if user has legal_org role
  if (
    userId &&
    LEGAL_ORG_ROUTES.some((pattern) => new RegExp(`^${pattern}$`).test(path))
  ) {
    try {
      const user = await clerkClient.users.getUser(userId);
      const role = user?.publicMetadata?.role as string;

      if (role !== "legal_org") {
        // Redirect non-legal-org users to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      // In case of error, redirect to dashboard as a fallback
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
