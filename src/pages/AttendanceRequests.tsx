
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AbsenceRequestForm from "@/components/student/AbsenceRequestForm";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, Eye, FileCheck, FileClock, FileX } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { AttendanceRequest } from "@/types";

const AttendanceRequests = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<AttendanceRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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

  // Fetch student's attendance requests
  const { data: requestHistory = [] } = useQuery({
    queryKey: ['student-attendance-requests'],
    queryFn: async () => {
      // TODO: Replace with actual user ID from auth
      const userId = "1"; // This should be replaced with the authenticated user's ID
      
      const { data, error } = await supabase
        .from('attendance_requests')
        .select('*')
        .eq('student_id', userId);
      
      if (error) {
        console.error("Error fetching attendance requests:", error);
        return [];
      }
      
      // Convert from Supabase format to our application format
      return (data || []).map(item => ({
        id: item.id,
        studentId: item.student_id || '',
        subjectId: item.subject_id || '',
        facultyId: item.faculty_id || '',
        date: item.date || '',
        reason: item.reason,
        proofUrl: item.proof_url,
        status: item.status as "pending" | "approved" | "rejected",
        createdAt: item.created_at || new Date().toISOString(),
        feedback: item.feedback,
      }));
    },
    enabled: !loading, // Only run query when component is done loading
  });

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };
  
  const formatDateTime = (dateTimeString: string) => {
    return format(new Date(dateTimeString), "MMM d, yyyy 'at' h:mm a");
  };

  const handleViewRequest = (request: AttendanceRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <FileX className="h-5 w-5 text-red-500" />;
      default:
        return <FileClock className="h-5 w-5 text-amber-500" />;
    }
  };

  // Mock data for subjects - this should be replaced with a query to get subjects
  const subjects = [
    { id: "1", name: "Web Development" },
    { id: "2", name: "Database Management" },
    { id: "3", name: "Data Structures" },
  ];

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : "Unknown Subject";
  };

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Attendance Requests</h1>
        <p className="text-muted-foreground">
          Submit and track your absence validation requests
        </p>
      </div>
      
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Request History</TabsTrigger>
          <TabsTrigger value="new">New Request</TabsTrigger>
        </TabsList>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Absence Requests</CardTitle>
              <CardDescription>
                Track the status of your submitted requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requestHistory.length > 0 ? (
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 p-3 border-b bg-muted/50 font-medium">
                      <div className="col-span-3">Subject</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-3 hidden md:block">Submitted</div>
                      <div className="col-span-3 md:col-span-2">Status</div>
                      <div className="col-span-1 md:col-span-2 text-right">Actions</div>
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto">
                      {requestHistory.map((request) => (
                        <div
                          key={request.id}
                          className="grid grid-cols-12 p-3 border-b last:border-0 items-center"
                        >
                          <div className="col-span-3">{getSubjectName(request.subjectId)}</div>
                          <div className="col-span-2 flex items-center">
                            <CalendarRange className="h-4 w-4 mr-1 text-muted-foreground hidden sm:inline" />
                            {formatDate(request.date)}
                          </div>
                          <div className="col-span-3 text-muted-foreground hidden md:block">
                            {formatDateTime(request.createdAt)}
                          </div>
                          <div className="col-span-3 md:col-span-2">
                            <Badge
                              variant="outline"
                              className={`${
                                request.status === "pending"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : request.status === "approved"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }`}
                            >
                              {request.status === "pending"
                                ? "Pending"
                                : request.status === "approved"
                                ? "Approved"
                                : "Rejected"}
                            </Badge>
                          </div>
                          <div className="col-span-1 md:col-span-2 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewRequest(request)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
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
        </TabsContent>
        <TabsContent value="new">
          <AbsenceRequestForm />
        </TabsContent>
      </Tabs>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedRequest && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getStatusIcon(selectedRequest.status)}
                <span>Request Details</span>
              </DialogTitle>
              <DialogDescription>
                {formatDate(selectedRequest.date)} • {getSubjectName(selectedRequest.subjectId)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Absence Reason
                </p>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <Badge
                  variant="outline"
                  className={`${
                    selectedRequest.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : selectedRequest.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedRequest.status === "pending"
                    ? "Pending Review"
                    : selectedRequest.status === "approved"
                    ? "Approved"
                    : "Rejected"}
                </Badge>
              </div>
              
              {selectedRequest.feedback && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Feedback
                  </p>
                  <p className="text-sm">{selectedRequest.feedback}</p>
                </div>
              )}
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Submitted
                </p>
                <p className="text-sm">
                  {formatDateTime(selectedRequest.createdAt)}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Supporting Document
                </p>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  View Document
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AttendanceRequests;
