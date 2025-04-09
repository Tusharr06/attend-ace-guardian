
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceRequestsTable from "@/components/faculty/AttendanceRequestsTable";

const ApprovalRequests = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in as faculty or using demo faculty
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");
    
    // Allow both real faculty users and demo faculty
    const isDemoFaculty = userEmail === "demo.faculty@example.com";
    
    if (!userRole && !isDemoFaculty) {
      navigate("/login");
    } else if (userRole !== "faculty" && !isDemoFaculty) {
      navigate("/student-dashboard");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Approval Requests</h1>
        <p className="text-muted-foreground">
          Review and process student attendance validation requests
        </p>
      </div>
      
      <AttendanceRequestsTable />
    </div>
  );
};

export default ApprovalRequests;
