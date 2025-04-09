
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  
  useEffect(() => {
    // Redirect if already logged in
    if (userRole === "student") {
      navigate("/student-dashboard");
    } else if (userRole === "faculty") {
      navigate("/faculty-dashboard");
    }
  }, [userRole, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-6xl w-full flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            AttendAce Guardian
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A comprehensive attendance management system for students and faculty
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>For Students</CardTitle>
              <CardDescription>
                Track your attendance and request validations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span>View attendance records across all subjects</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span>Track attendance percentage and statistics</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span>Submit absence validation requests with proof</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span>View validation request status</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => navigate("/login")}
                variant="default"
              >
                Login as Student
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="w-full">
            <CardHeader>
              <CardTitle>For Faculty</CardTitle>
              <CardDescription>
                Manage attendance and review student requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span>Record and update student attendance</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span>Generate and export attendance reports</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span>Review and approve absence validation requests</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span>View historical attendance data</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => navigate("/login")}
                variant="default"
              >
                Login as Faculty
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-4">
            New to AttendAce Guardian?
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/signup")}
            className="min-w-[200px]"
          >
            Create an Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
