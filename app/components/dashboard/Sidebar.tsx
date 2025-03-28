"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  Briefcase,
  Settings,
  Users,
  Building,
  LogOut,
  Mic,
  MessageSquare,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  const role = (user?.publicMetadata?.role as string) || "user";

  // Define navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { href: "/dashboard", label: "Dashboard", icon: Home },
    ];

    // Admin-specific links
    if (role === "admin") {
      return [
        ...commonLinks,
        { href: "/admin/users", label: "Users", icon: Users },
        {
          href: "/admin/organizations",
          label: "Legal Organizations",
          icon: Building,
        },
        { href: "/admin/cases", label: "All Cases", icon: FileText },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    }

    // Legal Organization links
    if (role === "legal_org") {
      return [
        ...commonLinks,
        {
          href: "/organization/cases",
          label: "Assigned Cases",
          icon: FileText,
        },
        { href: "/organization/clients", label: "Clients", icon: Users },
        { href: "/organization/profile", label: "Org Profile", icon: Building },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    }

    // Regular user links
    return [
      ...commonLinks,
      { href: "/dashboard/cases", label: "My Cases", icon: FileText },
      { href: "/dashboard/new-case", label: "New Case", icon: Mic },
      { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
      { href: "/settings", label: "Settings", icon: Settings },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <div className="w-64 bg-[#002366] text-white h-screen flex flex-col fixed">
      {/* Logo */}
      <div className="p-6 flex items-center justify-center border-b border-white/10">
        <Link href="/dashboard">
          <span className="text-xl font-bold">
            Ushuari<span className="text-[#D4AF37]">.</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link href={link.href} className="block">
                  <div
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#D4AF37] text-[#002366]"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <link.icon className="w-5 h-5 mr-3" />
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute w-1 h-6 bg-white rounded-full right-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section with sign out */}
      <div className="p-4 border-t border-white/10">
        <a
          href="/sign-out"
          className="flex items-center p-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Sign Out</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
