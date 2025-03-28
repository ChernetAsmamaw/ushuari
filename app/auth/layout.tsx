import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If user is already signed in, redirect to dashboard
  const { userId } = auth();

  if (userId) {
    redirect("/auth-redirect");
  }

  return <div className="min-h-screen">{children}</div>;
}
