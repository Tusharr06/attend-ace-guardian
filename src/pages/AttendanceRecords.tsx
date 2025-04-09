
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CalendarRange } from "lucide-react";
import { format } from "date-fns";

// Mock attendance data
const mockAttendanceData = [
  {
    subject: "Web Development",
    records: [
      { date: "2025-04-01", status: "present" },
      { date: "2025-04-03", status: "present" },
      { date: "2025-04-05", status: "present" },
      { date: "2025-04-08", status: "absent" },
      { date: "2025-04-10", status: "present" },
      { date: "2025-04-12", status: "present" },
      { date: "2025-04-15", status: "present" },
    ],
  },
  {
    subject: "Database Management",
    records: [
      { date: "2025-04-02", status: "present" },
      { date: "2025-04-04", status: "present" },
      { date: "2025-04-06", status: "absent" },
      { date: "2025-04-09", status: "present" },
      { date: "2025-04-11", status: "present" },
      { date: "2025-04-13", status: "present" },
      { date: "2025-04-16", status: "absent" },
    ],
  },
  {
    subject: "Data Structures",
    records: [
      { date: "2025-04-02", status: "present" },
      { date: "2025-04-05", status: "absent" },
      { date: "2025-04-07", status: "present" },
      { date: "2025-04-10", status: "present" },
      { date: "2025-04-12", status: "absent" },
      { date: "2025-04-14", status: "present" },
      { date: "2025-04-17", status: "present" },
    ],
  },
  {
    subject: "Computer Networks",
    records: [
      { date: "2025-04-01", status: "present" },
      { date: "2025-04-04", status: "absent" },
      { date: "2025-04-08", status: "present" },
      { date: "2025-04-11", status: "present" },
      { date: "2025-04-15", status: "present" },
      { date: "2025-04-18", status: "absent" },
    ],
  },
];

const AttendanceRecords = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
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

  const filteredAttendance = selectedSubject === "all"
    ? mockAttendanceData
    : mockAttendanceData.filter(subject => subject.subject === selectedSubject);

  const calculateStats = (records: { date: string; status: string }[]) => {
    const total = records.length;
    const present = records.filter(record => record.status === "present").length;
    const absent = total - present;
    const percentage = Math.round((present / total) * 100);
    
    return { total, present, absent, percentage };
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 65) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Attendance Records</h1>
        <p className="text-muted-foreground">
          View your detailed attendance history
        </p>
      </div>
      
      <div className="flex items-end space-x-4">
        <div className="space-y-2 w-64">
          <Label htmlFor="subject-select">Select Subject</Label>
          <Select
            value={selectedSubject}
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {mockAttendanceData.map((subject, index) => (
                <SelectItem key={index} value={subject.subject}>
                  {subject.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredAttendance.map((subject, subjectIndex) => {
          const stats = calculateStats(subject.records);
          
          return (
            <Card key={subjectIndex}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>{subject.subject}</span>
                  <span className={`text-sm ${
                    stats.percentage >= 75
                      ? "text-green-500"
                      : stats.percentage >= 65
                      ? "text-amber-500"
                      : "text-red-500"
                  }`}>
                    {stats.percentage}% Attendance
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance Progress</span>
                    <span className="text-muted-foreground">
                      {stats.present}/{stats.total} Classes
                    </span>
                  </div>
                  <Progress 
                    value={stats.percentage} 
                    className="h-2"
                    indicatorClassName={getProgressColor(stats.percentage)}
                  />
                </div>
                
                <div className="border rounded-md">
                  <div className="grid grid-cols-12 p-3 border-b bg-muted/50 font-medium">
                    <div className="col-span-8 md:col-span-6">Date</div>
                    <div className="col-span-4 md:col-span-6">Status</div>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto">
                    {subject.records.map((record, recordIndex) => (
                      <div 
                        key={recordIndex} 
                        className="grid grid-cols-12 p-3 border-b last:border-0 items-center"
                      >
                        <div className="col-span-8 md:col-span-6 flex items-center">
                          <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatDate(record.date)}
                        </div>
                        <div className="col-span-4 md:col-span-6">
                          <span 
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              record.status === "present" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {record.status === "present" ? "Present" : "Absent"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceRecords;
