export {};

// Define roles for the application
export type Role = "admin" | "legal_org" | "user";

// User interface
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// Legal case status
export type CaseStatus = "pending" | "in_progress" | "resolved" | "escalated";

// Case severity level
export type CaseSeverity = "low" | "medium" | "high" | "critical";

// Legal case interface
export interface LegalCase {
  id: string;
  userId: string;
  title: string;
  description: string;
  voiceRecordingUrl?: string;
  transcription?: string;
  status: CaseStatus;
  severity: CaseSeverity;
  assignedOrgId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Legal organization interface
export interface LegalOrganization {
  id: string;
  name: string;
  email: string;
  description: string;
  specialties: string[];
  location: string;
  contactPhone?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extend Clerk's JWT session claims
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role;
      organizationId?: string;
    };
  }
}
