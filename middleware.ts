import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create route matchers for protected routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isLegalOrgRoute = createRouteMatcher(["/organization(.*)"]);
const isUserDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = auth();

  // If the user isn't signed in and is trying to access a protected route, redirect to sign-in
  if (!userId) {
    if (
      isAdminRoute(req) ||
      isLegalOrgRoute(req) ||
      isUserDashboardRoute(req)
    ) {
      const signInUrl = new URL("/sign-in", req.url);
      // Save the original URL to redirect after sign-in
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  // RBAC: Check for admin routes
  if (isAdminRoute(req) && sessionClaims?.metadata?.role !== "admin") {
    // If not an admin, redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // RBAC: Check for legal organization routes
  if (isLegalOrgRoute(req) && sessionClaims?.metadata?.role !== "legal_org") {
    // If not a legal organization, redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.ico|.*\\.png$).*)"],
};
