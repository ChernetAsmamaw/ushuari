import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProvider } from "@/contexts/UserContext";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <UserProvider>
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <DashboardHeader />
            <main className="p-6 ml-64">{children}</main>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
