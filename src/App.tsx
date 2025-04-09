
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
import NotFound from "./pages/NotFound";
import React from "react"; // Add explicit React import

// Create a new query client instance
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
