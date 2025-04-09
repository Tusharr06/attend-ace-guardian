
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceCard from "@/components/student/AttendanceCard";
import AttendanceCalendar from "@/components/student/AttendanceCalendar";
import AbsenceRequestForm from "@/components/student/AbsenceRequestForm";
import { AttendanceStats } from "@/types";
import { ArrowUpRight, CalendarCheck, CalendarDays, CheckSquare, Clock, FileCheck } from "lucide-react";

// Mock subjects data
const mockSubjects = [
  { 
    id: "1", 
    name: "Web Development", 
    stats: { totalClasses: 25, present: 22, absent: 3, percentage: 88 } as AttendanceStats 
  },
  { 
    id: "2", 
    name: "Database Management", 
    stats: { totalClasses: 20, present: 18, absent: 2, percentage: 90 } as AttendanceStats 
  },
  { 
    id: "3", 
    name: "Data Structures", 
    stats: { totalClasses: 30, present: 21, absent: 9, percentage: 70 } as AttendanceStats 
  },
  { 
    id: "4", 
    name: "Computer Networks", 
    stats: { totalClasses: 22, present: 15, absent: 7, percentage: 68 } as AttendanceStats 
  },
];

// Mock request data
const mockRequests = [
  { id: "1", subject: "Web Development", date: "Apr 5, 2025", status: "approved" },
  { id: "2", subject: "Data Structures", date: "Apr 10, 2025", status: "pending" },
];

const StudentDashboard = () => {
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

  // Calculate overall attendance
  const overallStats = mockSubjects.reduce(
    (acc, subject) => {
      acc.totalClasses += subject.stats.totalClasses;
      acc.present += subject.stats.present;
      acc.absent += subject.stats.absent;
      return acc;
    },
    { totalClasses: 0, present: 0, absent: 0, percentage: 0 }
  );
  
  // Calculate the percentage after all values are summed
  overallStats.percentage = Math.round(
    (overallStats.present / overallStats.totalClasses) * 100
  );

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your attendance and manage absence requests
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Overall Attendance
                </p>
                <p className={`text-2xl font-bold ${
                  overallStats.percentage >= 75
                    ? "text-green-500"
                    : overallStats.percentage >= 65
                    ? "text-amber-500"
                    : "text-red-500"
                }`}>
                  {overallStats.percentage}%
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <CheckSquare className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Classes
                </p>
                <p className="text-2xl font-bold">
                  {overallStats.totalClasses}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Present Days
                </p>
                <p className="text-2xl font-bold text-green-500">
                  {overallStats.present}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CalendarCheck className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Absent Days
                </p>
                <p className="text-2xl font-bold text-red-500">
                  {overallStats.absent}
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <Clock className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="request">Submit Request</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Subject Attendance</CardTitle>
                <CardDescription>
                  Your attendance across all subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSubjects.map((subject) => (
                    <AttendanceCard 
                      key={subject.id} 
                      subject={subject.name} 
                      stats={subject.stats} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Attendance Requests</CardTitle>
                <CardDescription>
                  Status of your validation requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRequests.length > 0 ? (
                    <div className="border rounded-md">
                      {mockRequests.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between p-4 border-b last:border-0"
                        >
                          <div>
                            <p className="font-medium">{request.subject}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                request.status === "approved"
                                  ? "text-green-500"
                                  : request.status === "pending"
                                  ? "text-amber-500"
                                  : "text-red-500"
                              }`}
                            >
                              {request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)}
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileCheck className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                      <p>No requests submitted yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="calendar">
          <AttendanceCalendar />
        </TabsContent>
        <TabsContent value="request">
          <AbsenceRequestForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
