"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Bell, Search, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardHeader = () => {
  const { user } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample notifications - in a real app, these would come from your database
  const notifications = [
    {
      id: 1,
      message: "New case has been assigned to you",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Your case #1234 has been updated",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "New message from Legal Office",
      time: "3 hours ago",
      read: true,
    },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm h-16 ml-64">
      {/* Left section - Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-[#F5F5F5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
          />
        </div>
      </div>

      {/* Right section - User menu and notifications */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2 rounded-full hover:bg-[#F5F5F5] transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-6 w-6 text-gray-600" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute top-1.5 right-1.5 bg-red-500 w-2.5 h-2.5 rounded-full"></span>
            )}
          </button>

          {/* Notification dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
              >
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-medium text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            notification.read ? "opacity-70" : ""
                          }`}
                        >
                          <p className="text-sm text-gray-800">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-gray-100 text-center">
                  <button className="text-sm text-[#002366] hover:underline">
                    Mark all as read
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User button */}
        <UserButton />
      </div>
    </header>
  );
};

export default DashboardHeader;
