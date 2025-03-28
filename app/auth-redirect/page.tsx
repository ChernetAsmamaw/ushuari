"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useRole } from "@/hooks/useRole";

// This page handles redirects after sign-in based on user role
export default function AuthRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useUser();
  const { role, loading } = useRole();

  // Get the return URL if any
  const returnUrl = searchParams.get("redirect_url");

  useEffect(() => {
    // Wait for auth and role to load
    if (!isLoaded || loading) return;

    // If not signed in, redirect to sign-in
    if (!isSignedIn) {
      router.replace("/auth/sign-in");
      return;
    }

    // If there's a return URL, use it
    if (returnUrl) {
      router.replace(returnUrl);
      return;
    }

    // Otherwise, redirect based on role
    switch (role) {
      case "admin":
        router.replace("/admin");
        break;
      case "legal_org":
        router.replace("/organization");
        break;
      default:
        router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, role, loading, router, returnUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001A4D] to-[#002366] flex items-center justify-center">
      <div className="text-center text-white">
        <div className="mb-6 w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h1 className="text-xl font-medium">
          Redirecting you to the right place...
        </h1>
        <p className="text-gray-300 mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}
