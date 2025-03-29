import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// Define route groups
const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
];

const AUTH_ROUTES = ["/auth/sign-in(.*)", "/auth/sign-up(.*)"];

// Extend the default middleware behavior
const middleware = clerkMiddleware((auth, req) => {
  const { userId } = auth;
  const path = req.nextUrl.pathname;

  // Allow public routes for everyone
  if (
    PUBLIC_ROUTES.some((route) => new RegExp(`^${route}$`).test(path)) ||
    AUTH_ROUTES.some((route) => new RegExp(`^${route}$`).test(path))
  ) {
    return NextResponse.next();
  }

  // If user is not signed in and tries to access protected routes
  if (
    !userId &&
    (path.startsWith("/dashboard") ||
      path.startsWith("/admin") ||
      path.startsWith("/organization"))
  ) {
    // Instead of using redirectToSignIn, use NextResponse.redirect
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Signed-in users trying to access auth routes should go to dashboard
  if (userId && path.startsWith("/auth/") && path !== "/auth/sign-out") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // The role checks will be handled in the page components using
  // the server-side utility functions (requireRole)
  return NextResponse.next();
});

export default middleware;

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)", // Run middleware on API routes
  ],
};
