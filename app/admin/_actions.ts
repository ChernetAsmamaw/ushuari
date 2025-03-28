"use server";

import { Role } from "@/types/globals";
import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Set a user's role
 */
export async function setUserRole(formData: FormData) {
  // Check if the current user is an admin
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    return { success: false, message: "Unauthorized. Admin access required." };
  }

  const userId = formData.get("userId") as string;
  const role = formData.get("role") as Role;

  if (!userId || !role) {
    return { success: false, message: "User ID and role are required." };
  }

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });

    revalidatePath("/admin/users");
    return { success: true, message: `User role updated to ${role}.` };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, message: "Failed to update user role." };
  }
}

/**
 * Create a legal organization and set the user's role
 */
export async function createLegalOrganization(formData: FormData) {
  // Check if the current user is an admin
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    return { success: false, message: "Unauthorized. Admin access required." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const description = formData.get("description") as string;
  const specialties = (formData.get("specialties") as string)
    .split(",")
    .map((s) => s.trim());
  const location = formData.get("location") as string;
  const contactPhone = formData.get("contactPhone") as string;

  if (
    !name ||
    !email ||
    !description ||
    !location ||
    specialties.length === 0
  ) {
    return {
      success: false,
      message: "All required fields must be filled out.",
    };
  }

  try {
    // Create organization in your database
    // This is a placeholder - you would typically use a database client here
    const orgId = `org_${Date.now()}`;

    // Find or create a user with the given email
    let user;
    try {
      // First, try to find if the user already exists
      const existingUsers = await clerkClient.users.getUserList({
        emailAddress: [email],
      });

      if (existingUsers.length > 0) {
        user = existingUsers[0];
      } else {
        // If no user exists, create one
        user = await clerkClient.users.createUser({
          emailAddress: [email],
          password:
            Math.random().toString(36).slice(2, 10) +
            Math.random().toString(36).slice(2, 10).toUpperCase() +
            "!1",
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" "),
        });
      }
    } catch (error) {
      console.error("Error finding/creating user:", error);
      return {
        success: false,
        message: "Failed to create or find user account.",
      };
    }

    // Set the user's role and organization ID
    await clerkClient.users.updateUser(user.id, {
      publicMetadata: {
        role: "legal_org",
        organizationId: orgId,
      },
    });

    // Return success
    revalidatePath("/admin/organizations");
    return {
      success: true,
      message: `Legal organization "${name}" created successfully.`,
      data: {
        organizationId: orgId,
        userId: user.id,
      },
    };
  } catch (error) {
    console.error("Error creating legal organization:", error);
    return { success: false, message: "Failed to create legal organization." };
  }
}

/**
 * Deactivate a legal organization
 */
export async function deactivateLegalOrganization(formData: FormData) {
  // Check if the current user is an admin
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    return { success: false, message: "Unauthorized. Admin access required." };
  }

  const organizationId = formData.get("organizationId") as string;
  const userId = formData.get("userId") as string;

  if (!organizationId || !userId) {
    return {
      success: false,
      message: "Organization ID and User ID are required.",
    };
  }

  try {
    // Update the user to remove their role
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "user",
        organizationId: null,
      },
    });

    // In a real application, you would mark the organization as inactive in your database
    // but keep the record for audit purposes

    revalidatePath("/admin/organizations");
    return {
      success: true,
      message: "Legal organization deactivated successfully.",
    };
  } catch (error) {
    console.error("Error deactivating legal organization:", error);
    return {
      success: false,
      message: "Failed to deactivate legal organization.",
    };
  }
}
