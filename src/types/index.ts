
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
  facultyId: string; // Added facultyId
  date: string;
  reason: string;
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  feedback?: string;
}
