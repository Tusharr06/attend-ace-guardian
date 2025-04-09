
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceRequestsTable from "@/components/faculty/AttendanceRequestsTable";

const ApprovalRequests = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in as faculty
    const userRole = localStorage.getItem("userRole");
    if (!userRole) {
      navigate("/login");
    } else if (userRole !== "faculty") {
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
