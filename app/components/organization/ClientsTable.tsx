"use client";

import Link from "next/link";
import { MoreVertical, MessageSquare, FileText, Info } from "lucide-react";
import { useState } from "react";

type Client = {
  id: string;
  name: string;
  email: string;
  activeCases: number;
  joinedDate: Date;
};

type ClientsTableProps = {
  clients: Client[];
};

export const ClientsTable = ({ clients }: ClientsTableProps) => {
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const handleActionClick = (clientId: string) => {
    setActionMenuOpen(actionMenuOpen === clientId ? null : clientId);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
              Client
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
              Active Cases
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Client Since
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
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {client.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{client.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {client.activeCases > 0 ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {client.activeCases}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      0
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(client.joinedDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button
                  onClick={() => handleActionClick(client.id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>

                {actionMenuOpen === client.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link href={`/organization/clients/${client.id}`}>
                        <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Info className="mr-2 h-4 w-4 text-gray-500" />
                          View Details
                        </div>
                      </Link>

                      <Link href={`/organization/clients/${client.id}/cases`}>
                        <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <FileText className="mr-2 h-4 w-4 text-gray-500" />
                          View Cases
                        </div>
                      </Link>

                      <Link href={`/organization/clients/${client.id}/message`}>
                        <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <MessageSquare className="mr-2 h-4 w-4 text-gray-500" />
                          Send Message
                        </div>
                      </Link>
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
