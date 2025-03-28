import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { requireRole } from "@/utils/roles";
import { UsersTable } from "@/components/admin/UsersTable";
import { AdminStats } from "@/components/admin/AdminStats";
import { Users, Building2, FileText, AlertCircle } from "lucide-react";

export default async function AdminDashboard() {
  // Check if user is admin
  await requireRole("admin", "/dashboard");

  // Sample stats for admin dashboard - in a real app, fetch from database
  const stats = [
    {
      title: "Total Users",
      value: "147",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Legal Organizations",
      value: "24",
      change: "+5%",
      trend: "up",
      icon: Building2,
      color: "bg-purple-500",
    },
    {
      title: "Active Cases",
      value: "89",
      change: "+18%",
      trend: "up",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Urgent Cases",
      value: "12",
      change: "-3%",
      trend: "down",
      icon: AlertCircle,
      color: "bg-red-500",
    },
  ];

  // Sample recent users for the table - in a real app, fetch from database/Clerk
  const recentUsers = [
    {
      id: "user_1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
      createdAt: new Date("2023-03-15"),
    },
    {
      id: "user_2",
      name: "Alice Smith",
      email: "alice@legalpros.com",
      role: "legal_org",
      createdAt: new Date("2023-03-12"),
    },
    {
      id: "user_3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      createdAt: new Date("2023-03-10"),
    },
    {
      id: "user_4",
      name: "Jane Wilson",
      email: "jane@lawfirm.com",
      role: "legal_org",
      createdAt: new Date("2023-03-08"),
    },
    {
      id: "user_5",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "user",
      createdAt: new Date("2023-03-05"),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage users, organizations, and monitor system activity
        </p>
      </div>

      {/* Stats Section */}
      <AdminStats stats={stats} />

      {/* Recent Users Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Users</h2>
          <a
            href="/admin/users"
            className="text-[#002366] text-sm hover:underline"
          >
            View all users
          </a>
        </div>

        <UsersTable users={recentUsers} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/users/new"
              className="block w-full py-2 px-4 bg-[#002366] text-white text-center rounded-lg hover:bg-[#001A4D] transition-colors"
            >
              Add New User
            </a>
            <a
              href="/admin/organizations/new"
              className="block w-full py-2 px-4 bg-[#D4AF37] text-[#002366] text-center rounded-lg hover:bg-[#C09A27] transition-colors"
            >
              Create Legal Organization
            </a>
            <a
              href="/admin/cases"
              className="block w-full py-2 px-4 bg-gray-100 text-gray-800 text-center rounded-lg hover:bg-gray-200 transition-colors"
            >
              Review Pending Cases
            </a>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            System Health
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Server Status</span>
                <span className="text-sm text-green-600 font-medium">
                  Online
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">API Response Time</span>
                <span className="text-sm text-green-600 font-medium">
                  124ms
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Storage Usage</span>
                <span className="text-sm text-amber-600 font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p className="text-sm text-gray-800">
                  New legal organization registered
                </p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm text-gray-800">User role updated</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <div>
                <p className="text-sm text-gray-800">
                  New critical case submitted
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
              <div>
                <p className="text-sm text-gray-800">System backup completed</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
