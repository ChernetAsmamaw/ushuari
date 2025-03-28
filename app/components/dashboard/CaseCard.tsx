"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Hourglass,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { CaseStatus, CaseSeverity, LegalCase } from "@/types/globals";

type CaseCardProps = {
  caseData: Partial<LegalCase>;
};

export const CaseCard = ({ caseData }: CaseCardProps) => {
  // Format date to display
  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Determine status icon and color
  const getStatusDetails = (status: CaseStatus | undefined) => {
    switch (status) {
      case "pending":
        return {
          icon: Hourglass,
          color: "text-amber-500",
          bgColor: "bg-amber-100",
          label: "Pending Review",
        };
      case "in_progress":
        return {
          icon: Clock,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          label: "In Progress",
        };
      case "resolved":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-100",
          label: "Resolved",
        };
      case "escalated":
        return {
          icon: AlertTriangle,
          color: "text-red-500",
          bgColor: "bg-red-100",
          label: "Escalated",
        };
      default:
        return {
          icon: Hourglass,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          label: "Unknown",
        };
    }
  };

  // Determine severity badge style
  const getSeverityBadge = (severity: CaseSeverity | undefined) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusDetails = getStatusDetails(caseData.status as CaseStatus);
  const StatusIcon = statusDetails.icon;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all overflow-hidden"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 mb-1">{caseData.title}</h3>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {caseData.description}
        </p>

        <div className="flex flex-wrap justify-between items-center">
          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            <div className={`p-1 rounded-full ${statusDetails.bgColor}`}>
              <StatusIcon className={`w-4 h-4 ${statusDetails.color}`} />
            </div>
            <span className="text-sm text-gray-700">{statusDetails.label}</span>
          </div>

          {/* Severity Badge */}
          {caseData.severity && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${getSeverityBadge(
                caseData.severity as CaseSeverity
              )}`}
            >
              {caseData.severity.charAt(0).toUpperCase() +
                caseData.severity.slice(1)}{" "}
              Priority
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Created: {formatDate(caseData.createdAt)}
          </div>
          <Link href={`/dashboard/cases/${caseData.id}`}>
            <button className="flex items-center text-xs text-[#002366] hover:underline">
              <span>View details</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
