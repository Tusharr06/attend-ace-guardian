
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultyList from "@/components/student/FacultyList";

const FacultyDirectory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in as a student
    const userRole = localStorage.getItem("userRole");
    if (!userRole) {
      navigate("/login");
    } else if (userRole !== "student") {
      navigate("/faculty-dashboard");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Faculty Directory</h1>
        <p className="text-muted-foreground">
          View faculty information and their teaching subjects
        </p>
      </div>
      
      <FacultyList />
    </div>
  );
};

export default FacultyDirectory;
