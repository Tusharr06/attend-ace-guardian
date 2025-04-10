
export interface AttendanceStats {
  totalClasses: number;
  present: number;
  absent: number;
  percentage: number;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: "present" | "absent";
}

export interface AttendanceRequest {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName?: string; // Added subjectName
  facultyId: string;
  facultyName?: string; // Added facultyName
  date: string;
  reason: string;
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  feedback?: string;
}

export type UserRole = "student" | "faculty";
