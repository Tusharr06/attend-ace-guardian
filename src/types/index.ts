
export type UserRole = "student" | "faculty";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Student extends User {
  usn: string;
  semester: number;
  section: string;
}

export interface Faculty extends User {
  department: string;
  subjects: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  facultyId: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: "present" | "absent";
}

export interface AttendanceRequest {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  reason: string;
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface AttendanceStats {
  totalClasses: number;
  present: number;
  absent: number;
  percentage: number;
}
