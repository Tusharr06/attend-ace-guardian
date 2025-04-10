
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNav from "@/components/layout/MainNav";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AttendanceRecords from "./pages/AttendanceRecords";
import AttendanceRequests from "./pages/AttendanceRequests";
import ApprovalRequests from "./pages/ApprovalRequests";
import ManageAttendance from "./pages/ManageAttendance";
import FacultyDirectory from "./pages/FacultyDirectory";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";

// Create a new query client instance inside the component to ensure it's created
// within the React lifecycle
const App = () => {
  // Create the query client within the component
  const [queryClient] = useState(() => new QueryClient());

  // Setup demo faculty accounts if they don't exist
  useEffect(() => {
    // Pre-populate attendance requests for demo
    const existingRequests = localStorage.getItem("attendanceRequests");
    if (!existingRequests) {
      // Create some demo requests
      const demoRequests = [
        {
          id: "1",
          studentId: "student1",
          studentName: "John Doe",
          subjectId: "CS101",
          subjectName: "Web Development",
          facultyId: "faculty1",
          facultyName: "Prof. Johnson",
          date: new Date(2025, 3, 8).toISOString(),
          reason: "Medical appointment",
          proofUrl: "medical_certificate.pdf",
          status: "pending",
          createdAt: new Date(2025, 3, 7).toISOString(),
        },
        {
          id: "2",
          studentId: "student2",
          studentName: "Sarah Chen",
          subjectId: "CS102",
          subjectName: "Database Management",
          facultyId: "faculty2",
          facultyName: "Prof. Williams",
          date: new Date(2025, 3, 10).toISOString(),
          reason: "Family emergency",
          proofUrl: "family_emergency.pdf",
          status: "approved",
          createdAt: new Date(2025, 3, 9).toISOString(),
          feedback: "Approved based on documentation provided."
        },
        {
          id: "3",
          studentId: "student3",
          studentName: "Michael Rodriguez",
          subjectId: "CS103",
          subjectName: "Data Structures",
          facultyId: "faculty3",
          facultyName: "Prof. Davis",
          date: new Date(2025, 3, 12).toISOString(),
          reason: "Technical issues during online class",
          proofUrl: "error_screenshot.jpg",
          status: "rejected",
          createdAt: new Date(2025, 3, 11).toISOString(),
          feedback: "Not a valid reason for absence according to department policy."
        }
      ];
      
      localStorage.setItem("attendanceRequests", JSON.stringify(demoRequests));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="/attendance-records" element={<AttendanceRecords />} />
            <Route path="/attendance-requests" element={<AttendanceRequests />} />
            <Route path="/approval-requests" element={<ApprovalRequests />} />
            <Route path="/manage-attendance" element={<ManageAttendance />} />
            <Route path="/faculty-directory" element={<FacultyDirectory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
