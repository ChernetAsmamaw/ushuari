"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { useRole } from "@/hooks/useRole";
import { Role } from "@/types/globals";

interface UserContextType {
  role: Role | null;
  isAdmin: boolean;
  isLegalOrg: boolean;
  organizationId: string | null;
  loading: boolean;
  userFullName: string | null;
  userEmail: string | null;
  userImageUrl: string | null;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const { role, isAdmin, isLegalOrg, organizationId, loading } = useRole();

  // Get user profile information
  const userFullName =
    isLoaded && user ? `${user.firstName} ${user.lastName}` : null;
  const userEmail =
    isLoaded && user ? user.primaryEmailAddress?.emailAddress || null : null;
  const userImageUrl = isLoaded && user ? user.imageUrl || null : null;

  const value = {
    role,
    isAdmin,
    isLegalOrg,
    organizationId,
    loading: !isLoaded || loading,
    userFullName,
    userEmail,
    userImageUrl,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook to use the user context
export function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}
