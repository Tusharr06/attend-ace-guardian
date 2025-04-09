
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceManagement from "@/components/faculty/AttendanceManagement";
import AttendanceRequestsTable from "@/components/faculty/AttendanceRequestsTable";
import { CalendarClock, FileCheck, FilePenLine, GraduationCap, Users } from "lucide-react";

// Mock data
const facultyStats = {
  totalStudents: 150,
  totalClasses: 45,
  pendingRequests: 4,
  attendanceRate: 85,
};

const classesBySubject = [
  { name: "Web Development", count: 12, average: 88 },
  { name: "Database Management", count: 15, average: 92 },
  { name: "Data Structures", count: 18, average: 78 },
];

const FacultyDashboard = () => {
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
        <h1 className="text-3xl font-bold mb-2">Faculty Dashboard</h1>
        <p className="text-muted-foreground">
          Manage student attendance and review absence requests
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Students
                </p>
                <p className="text-2xl font-bold">
                  {facultyStats.totalStudents}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Classes Conducted
                </p>
                <p className="text-2xl font-bold">
                  {facultyStats.totalClasses}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Requests
                </p>
                <p className="text-2xl font-bold text-amber-500">
                  {facultyStats.pendingRequests}
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <FilePenLine className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Attendance
                </p>
                <p className="text-2xl font-bold text-green-500">
                  {facultyStats.attendanceRate}%
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CalendarClock className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="manage">Manage Attendance</TabsTrigger>
          <TabsTrigger value="requests">Approval Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Classes by Subject</CardTitle>
                <CardDescription>
                  Summary of classes conducted and attendance rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classesBySubject.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {subject.count} classes conducted
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-medium ${
                            subject.average >= 75
                              ? "text-green-500"
                              : subject.average >= 65
                              ? "text-amber-500"
                              : "text-red-500"
                          }`}
                        >
                          {subject.average}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          avg. attendance
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Approval Requests</CardTitle>
                <CardDescription>
                  Latest attendance validation requests from students
                </CardDescription>
              </CardHeader>
              <CardContent>
                {facultyStats.pendingRequests > 0 ? (
                  <div className="space-y-4">
                    <div className="border rounded-md">
                      <div className="p-4 border-b">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">
                              Web Development • Apr 5, 2025
                            </p>
                          </div>
                          <span className="text-sm font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        </div>
                      </div>
                      <div className="p-4 border-b">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Sarah Taylor</p>
                            <p className="text-sm text-muted-foreground">
                              Data Structures • Apr 8, 2025
                            </p>
                          </div>
                          <span className="text-sm font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <a href="/approval-requests" className="text-sm text-primary hover:underline">
                        View all requests →
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileCheck className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p>No pending approval requests</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="manage">
          <AttendanceManagement />
        </TabsContent>
        <TabsContent value="requests">
          <AttendanceRequestsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyDashboard;
