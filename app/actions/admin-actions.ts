"use server";

import { Role } from "@/types/globals";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Set a user's role - can only be performed by admins
 */
export async function setUserRole(formData: FormData) {
  // Verify current user is an admin
  const { userId } = auth();

  if (!userId) {
    return { success: false, message: "Not authenticated" };
  }

  // Check if current user is an admin
  const currentUser = await clerkClient.users.getUser(userId);
  const currentUserRole = currentUser?.publicMetadata?.role;

  if (currentUserRole !== "admin") {
    return { success: false, message: "Unauthorized. Admin access required." };
  }

  // Get parameters
  const targetUserId = formData.get("userId") as string;
  const role = formData.get("role") as Role;

  if (!targetUserId || !role) {
    return { success: false, message: "User ID and role are required." };
  }

  try {
    // Update user role in Clerk
    await clerkClient.users.updateUser(targetUserId, {
      publicMetadata: { role },
    });

    // Revalidate the admin users page
    revalidatePath("/admin/users");
    return { success: true, message: `User role updated to ${role}.` };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, message: "Failed to update user role." };
  }
}
