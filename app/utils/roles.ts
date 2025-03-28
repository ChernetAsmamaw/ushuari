import { Role } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Check if the current user has the specified role
 */
export const checkRole = async (role: Role): Promise<boolean> => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.role === role;
};

/**
 * Check if the current user has the specified role, redirect if not
 */
export const requireRole = async (role: Role, redirectPath: string = "/") => {
  const hasRole = await checkRole(role);
  if (!hasRole) {
    redirect(redirectPath);
  }
};

/**
 * Check if the current user has any of the specified roles
 */
export const checkAnyRole = async (roles: Role[]): Promise<boolean> => {
  const { sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata?.role as Role | undefined;

  if (!userRole) return false;
  return roles.includes(userRole);
};

/**
 * Check if the current user has any of the specified roles, redirect if not
 */
export const requireAnyRole = async (
  roles: Role[],
  redirectPath: string = "/"
) => {
  const hasAnyRole = await checkAnyRole(roles);
  if (!hasAnyRole) {
    redirect(redirectPath);
  }
};

/**
 * Get the current user's role
 */
export const getUserRole = async (): Promise<Role | undefined> => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.role as Role | undefined;
};

/**
 * Get the organization ID for a legal organization user
 */
export const getOrganizationId = async (): Promise<string | undefined> => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.organizationId as string | undefined;
};
