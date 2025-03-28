"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type StatProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: string;
};

type AdminStatsProps = {
  stats: StatProps[];
};

export const AdminStats = ({ stats }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <AdminStatCard key={index} {...stat} />
      ))}
    </div>
  );
};

const AdminStatCard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: StatProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow p-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${color.replace("bg-", "text-")}`} />
        </div>

        <div
          className={`flex items-center text-sm ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          <span>{change}</span>
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 ml-1" />
          ) : (
            <TrendingDown className="h-4 w-4 ml-1" />
          )}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-1 text-gray-900">{value}</p>
      </div>
    </motion.div>
  );
};
