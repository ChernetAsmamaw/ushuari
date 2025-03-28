import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { requireRole } from "@/utils/roles";
import { CaseCard } from "@/components/dashboard/CaseCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FileText, Users, CheckCircle2, Clock, BarChart } from "lucide-react";
import { ClientsTable } from "@/components/organization/ClientsTable";
import { CasesByPriorityChart } from "@/components/organization/CasesByPriorityChart";

export default async function OrganizationDashboard() {
  // Check if user is a legal organization
  await requireRole("legal_org", "/dashboard");

  const user = await currentUser();
  const organizationId = user?.publicMetadata.organizationId as string;

  if (!organizationId) {
    // If no organization ID found, redirect to a setup page or show an error
    redirect("/organization/setup");
  }

  // Sample organization data - in a real app, would fetch from database
  const organizationData = {
    id: organizationId,
    name: "Legal Professionals LLC",
    email: user?.emailAddresses[0].emailAddress,
    description: "Providing expert legal advice and representation",
    specialties: ["Employment Law", "Contract Law", "Dispute Resolution"],
    location: "New York, NY",
  };

  // Sample stats
  const stats = [
    {
      title: "Active Cases",
      value: "28",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Total Clients",
      value: "142",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Resolved Cases",
      value: "95",
      icon: CheckCircle2,
      color: "bg-green-500",
    },
    {
      title: "Avg Response Time",
      value: "4.2h",
      icon: Clock,
      color: "bg-amber-500",
    },
  ];

  // Sample active cases
  const activeCases = [
    {
      id: "case_1",
      title: "Wrongful Termination Dispute",
      description:
        "Employee claims they were fired without just cause after 5 years of service.",
      status: "in_progress",
      severity: "high",
      createdAt: new Date("2023-03-10T15:30:00"),
      updatedAt: new Date("2023-03-15T09:15:00"),
    },
    {
      id: "case_2",
      title: "Commercial Lease Agreement Review",
      description:
        "Client needs review of a 5-year commercial property lease with complex terms.",
      status: "pending",
      severity: "medium",
      createdAt: new Date("2023-03-14T11:20:00"),
      updatedAt: new Date("2023-03-14T11:20:00"),
    },
    {
      id: "case_3",
      title: "Intellectual Property Infringement",
      description:
        "Small business owner believes competitor is using their patented design.",
      status: "in_progress",
      severity: "critical",
      createdAt: new Date("2023-03-08T09:45:00"),
      updatedAt: new Date("2023-03-12T16:30:00"),
    },
  ];

  // Sample clients for the table
  const recentClients = [
    {
      id: "client_1",
      name: "John Smith",
      email: "john.smith@example.com",
      activeCases: 2,
      joinedDate: new Date("2023-01-15"),
    },
    {
      id: "client_2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      activeCases: 1,
      joinedDate: new Date("2023-02-20"),
    },
    {
      id: "client_3",
      name: "Michael Brown",
      email: "michael.b@example.com",
      activeCases: 0,
      joinedDate: new Date("2023-02-05"),
    },
    {
      id: "client_4",
      name: "Emily Wilson",
      email: "emily.w@example.com",
      activeCases: 3,
      joinedDate: new Date("2023-01-10"),
    },
  ];

  // Sample case distribution data
  const caseDistribution = {
    labels: ["Low", "Medium", "High", "Critical"],
    data: [8, 12, 6, 2],
  };

  return (
    <div className="space-y-8">
      {/* Organization Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {organizationData.name}
        </h1>
        <p className="text-gray-600 mt-1">{organizationData.description}</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {organizationData.location}
          </div>
          {organizationData.specialties.map((specialty) => (
            <div
              key={specialty}
              className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
            >
              {specialty}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
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
        {/* Active Cases */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Active Cases
            </h2>
            <a
              href="/organization/cases"
              className="text-[#002366] text-sm hover:underline"
            >
              View all cases
            </a>
          </div>

          <div className="space-y-4">
            {activeCases.length > 0 ? (
              activeCases.map((caseItem) => (
                <CaseCard key={caseItem.id} caseData={caseItem} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No active cases at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Cases by Priority Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Cases by Priority
          </h2>
          <CasesByPriorityChart
            labels={caseDistribution.labels}
            data={caseDistribution.data}
          />

          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Response Rate</p>
                <p className="text-lg font-semibold text-gray-800">97%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Resolution Rate</p>
                <p className="text-lg font-semibold text-gray-800">89%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Clients */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Clients
          </h2>
          <a
            href="/organization/clients"
            className="text-[#002366] text-sm hover:underline"
          >
            View all clients
          </a>
        </div>

        <ClientsTable clients={recentClients} />
      </div>
    </div>
  );
}
