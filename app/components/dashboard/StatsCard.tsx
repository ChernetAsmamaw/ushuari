"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
};

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
}: StatsCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1 text-gray-900">{value}</p>
        </div>

        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${color.replace("bg-", "text-")}`} />
        </div>
      </div>
    </motion.div>
  );
};
