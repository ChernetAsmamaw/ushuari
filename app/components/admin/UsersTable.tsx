"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Edit, UserX, Shield } from "lucide-react";
import { setUserRole } from "@/app/admin/_actions";
import { Role } from "@/types/globals";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

type UsersTableProps = {
  users: User[];
};

export const UsersTable = ({ users }: UsersTableProps) => {
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const handleActionClick = (userId: string) => {
    setActionMenuOpen(actionMenuOpen === userId ? null : userId);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "legal_org":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Joined
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeStyle(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(user.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button
                  onClick={() => handleActionClick(user.id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>

                {actionMenuOpen === user.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link href={`/admin/users/${user.id}`}>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <Edit className="mr-2 h-4 w-4 text-gray-500" />
                          Edit User
                        </button>
                      </Link>

                      <form action={setUserRole}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="role" value="admin" />
                        <button
                          type="submit"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <Shield className="mr-2 h-4 w-4 text-gray-500" />
                          Make Admin
                        </button>
                      </form>

                      <form action={setUserRole}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="role" value="user" />
                        <button
                          type="submit"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <UserX className="mr-2 h-4 w-4 text-gray-500" />
                          Reset to User
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
