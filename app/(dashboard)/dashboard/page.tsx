import { auth, currentUser } from "@clerk/nextjs/server";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { CaseCard } from "@/components/dashboard/CaseCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { VoiceRecorder } from "@/components/dashboard/VoiceRecorder";

export default async function UserDashboard() {
  const { userId } = auth();
  const user = await currentUser();

  // Sample data - in a real app, would fetch from database
  const recentCases = [
    {
      id: "case_1",
      title: "Employment Contract Review",
      description: "Need help reviewing my employment contract before signing.",
      status: "in_progress",
      severity: "medium",
      createdAt: new Date("2023-03-10T15:30:00"),
      updatedAt: new Date("2023-03-11T09:15:00"),
    },
    {
      id: "case_2",
      title: "Landlord Dispute",
      description:
        "Having issues with my landlord refusing to fix plumbing issues.",
      status: "pending",
      severity: "high",
      createdAt: new Date("2023-03-08T11:20:00"),
      updatedAt: new Date("2023-03-08T11:20:00"),
    },
  ];

  const stats = [
    {
      title: "Active Cases",
      value: "2",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Pending Review",
      value: "1",
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      title: "Resolved",
      value: "3",
      icon: CheckCircle2,
      color: "bg-green-500",
    },
    {
      title: "Urgent",
      value: "0",
      icon: AlertCircle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.firstName}
        </h1>
        <p className="text-gray-600">Here's an overview of your legal cases</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Cases
            </h2>
            <a
              href="/dashboard/cases"
              className="text-[#002366] text-sm hover:underline"
            >
              View all
            </a>
          </div>

          <div className="space-y-4">
            {recentCases.length > 0 ? (
              recentCases.map((caseItem) => (
                <CaseCard key={caseItem.id} caseData={caseItem} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>You don't have any cases yet.</p>
                <button className="mt-2 text-[#002366] hover:underline">
                  Create your first case
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Voice Recorder Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Voice Query
          </h2>
          <p className="text-gray-600 mb-6">
            Record your legal question and get connected with a professional
          </p>

          <VoiceRecorder />

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Suggested topics:
            </h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200">
                Tenant rights
              </button>
              <button className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200">
                Employment
              </button>
              <button className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200">
                Contract review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
