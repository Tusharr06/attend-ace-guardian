import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { AttendanceRequest } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { facultyData } from "@/components/student/FacultyList";

// Mock data for students
const mockStudents = [
  { id: "1", name: "John Doe", usn: "1XX22CS001" },
  { id: "3", name: "Robert Johnson", usn: "1XX22CS003" },
  { id: "6", name: "Sarah Taylor", usn: "1XX22CS006" },
  { id: "9", name: "Thomas Martinez", usn: "1XX22CS009" },
];

// Use the faculty data from FacultyList component
const mockFaculties = facultyData;

// Create subjects based on faculty data
const mockSubjects = facultyData.flatMap(faculty => 
  faculty.subjects.map((name, index) => ({
    id: `${faculty.id}-${index}`,
    name,
  }))
);

const AttendanceRequestsTable = () => {
  const [selectedRequest, setSelectedRequest] = useState<AttendanceRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requests, setRequests] = useState<AttendanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load attendance requests from localStorage for demo
  useEffect(() => {
    // Check which faculty is logged in
    const userEmail = localStorage.getItem("userEmail");
    const isDemoFaculty = userEmail === "demo.faculty@example.com";
    
    setLoading(true);
    
    try {
      // Get stored requests
      const storedRequests = JSON.parse(localStorage.getItem("attendanceRequests") || "[]");
      
      if (isDemoFaculty) {
        // Show all requests for demo faculty
        setRequests(storedRequests);
      } else {
        // For a real faculty account, only show requests assigned to them
        // This is placeholder logic - in a real app, you'd filter by the logged-in faculty's ID
        setRequests(storedRequests);
      }
    } catch (error) {
      console.error("Error loading attendance requests:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update request status
  const handleUpdateRequestStatus = async (requestId: string, status: "approved" | "rejected", feedback?: string) => {
    try {
      // Get current requests from localStorage
      const currentRequests = JSON.parse(localStorage.getItem("attendanceRequests") || "[]");
      
      // Update the specific request
      const updatedRequests = currentRequests.map((req: any) => 
        req.id === requestId ? { ...req, status, feedback: feedback || req.feedback } : req
      );
      
      // Save back to localStorage
      localStorage.setItem("attendanceRequests", JSON.stringify(updatedRequests));
      
      // Update local state
      setRequests(updatedRequests);
      
      return { requestId, status };
    } catch (error) {
      console.error("Error updating request:", error);
      throw error;
    }
  };

  const getStudentName = (studentId: string) => {
    const student = mockStudents.find((s) => s.id === studentId);
    return student ? student.name : "Unknown Student";
  };

  const getStudentUSN = (studentId: string) => {
    const student = mockStudents.find((s) => s.id === studentId);
    return student ? student.usn : "Unknown USN";
  };

  const getSubjectName = (subjectId: string) => {
    const subject = mockSubjects.find((s) => s.id === subjectId);
    return subject ? subject.name : "Unknown Subject";
  };

  const getFacultyName = (facultyId: string) => {
    const faculty = mockFaculties.find((f) => f.id === facultyId);
    return faculty ? faculty.name : "Unknown Faculty";
  };

  const handleViewRequest = (request: AttendanceRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      await handleUpdateRequestStatus(requestId, "approved");
      
      setIsDialogOpen(false);
      
      toast({
        title: "Request approved",
        description: "The attendance request has been approved.",
      });
      
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error approving the request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await handleUpdateRequestStatus(requestId, "rejected");
      
      setIsDialogOpen(false);
      
      toast({
        title: "Request rejected",
        description: "The attendance request has been rejected.",
      });
      
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error rejecting the request. Please try again.",
        variant: "destructive",      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading attendance requests...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance Requests</CardTitle>
        <CardDescription>
          Review and manage student attendance validation requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <div className="grid grid-cols-12 p-3 border-b bg-muted/50 font-medium">
            <div className="col-span-2 md:col-span-2">Date</div>
            <div className="col-span-3 md:col-span-2">Student</div>
            <div className="hidden md:block md:col-span-2">USN</div>
            <div className="col-span-3 md:col-span-2">Subject</div>
            <div className="col-span-2 md:col-span-2">Status</div>
            <div className="col-span-2 md:col-span-2 text-right">Actions</div>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div key={request.id} className="grid grid-cols-12 p-3 border-b last:border-0 items-center">
                  <div className="col-span-2 md:col-span-2">
                    {formatDate(request.date)}
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    {getStudentName(request.studentId)}
                  </div>
                  <div className="hidden md:block md:col-span-2">
                    {getStudentUSN(request.studentId)}
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    {request.subjectName || getSubjectName(request.subjectId)}
                  </div>
                  <div className="col-span-2 md:col-span-2">
                    <Badge
                      variant="outline"
                      className={`${
                        request.status === "pending"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : request.status === "approved"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : request.status === "rejected"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : ""
                      }`}
                    >
                      {request.status === "pending"
                        ? "Pending"
                        : request.status === "approved"
                        ? "Approved"
                        : "Rejected"}
                    </Badge>
                  </div>
                  <div className="col-span-2 md:col-span-2 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewRequest(request)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No attendance requests found.
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedRequest && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Attendance Request Details</DialogTitle>
              <DialogDescription>
                Review the details before making a decision
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Student</p>
                  <p className="text-sm">{getStudentName(selectedRequest.studentId)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">USN</p>
                  <p className="text-sm">{getStudentUSN(selectedRequest.studentId)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="text-sm">{formatDate(selectedRequest.date)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Subject</p>
                  <p className="text-sm">{selectedRequest.subjectName || getSubjectName(selectedRequest.subjectId)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Faculty</p>
                  <p className="text-sm">{selectedRequest.facultyName || getFacultyName(selectedRequest.facultyId)}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Reason</p>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Supporting Document</p>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  View Document
                </Button>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge
                  variant="outline"
                  className={`${
                    selectedRequest.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : selectedRequest.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : selectedRequest.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : ""
                  }`}
                >
                  {selectedRequest.status === "pending"
                    ? "Pending"
                    : selectedRequest.status === "approved"
                    ? "Approved"
                    : "Rejected"}
                </Badge>
              </div>
            </div>
            
            <DialogFooter className="flex space-x-2 justify-end">
              {selectedRequest.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleRejectRequest(selectedRequest.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApproveRequest(selectedRequest.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
              {selectedRequest.status !== "pending" && (
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
};

export default AttendanceRequestsTable;
