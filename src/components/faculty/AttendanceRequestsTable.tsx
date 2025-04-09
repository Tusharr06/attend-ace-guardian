
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { AttendanceRequest } from "@/types";

// Mock data for attendance requests
const mockRequests: AttendanceRequest[] = [
  {
    id: "1",
    studentId: "1",
    subjectId: "1",
    date: "2025-04-01",
    reason: "Medical emergency",
    proofUrl: "https://example.com/proof1.pdf",
    status: "pending",
    createdAt: "2025-04-02T10:30:00Z",
  },
  {
    id: "2",
    studentId: "3",
    subjectId: "1",
    date: "2025-04-05",
    reason: "Family function",
    proofUrl: "https://example.com/proof2.pdf",
    status: "approved",
    createdAt: "2025-04-06T09:15:00Z",
  },
  {
    id: "3",
    studentId: "6",
    subjectId: "2",
    date: "2025-04-08",
    reason: "Technical issues during online class",
    proofUrl: "https://example.com/proof3.pdf",
    status: "rejected",
    createdAt: "2025-04-09T14:45:00Z",
  },
  {
    id: "4",
    studentId: "9",
    subjectId: "3",
    date: "2025-04-12",
    reason: "Medical appointment",
    proofUrl: "https://example.com/proof4.pdf",
    status: "pending",
    createdAt: "2025-04-12T16:20:00Z",
  },
];

// Mock data for students
const mockStudents = [
  { id: "1", name: "John Doe", usn: "1XX22CS001" },
  { id: "3", name: "Robert Johnson", usn: "1XX22CS003" },
  { id: "6", name: "Sarah Taylor", usn: "1XX22CS006" },
  { id: "9", name: "Thomas Martinez", usn: "1XX22CS009" },
];

// Mock data for subjects
const mockSubjects = [
  { id: "1", name: "Web Development" },
  { id: "2", name: "Database Management" },
  { id: "3", name: "Data Structures" },
];

const AttendanceRequestsTable = () => {
  const [requests, setRequests] = useState<AttendanceRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<AttendanceRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { toast } = useToast();

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

  const handleViewRequest = (request: AttendanceRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleApproveRequest = async (requestId: string) => {
    // This is a placeholder for Supabase integration
    // In a real implementation, this would update the database
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(
        requests.map((request) =>
          request.id === requestId
            ? { ...request, status: "approved" }
            : request
        )
      );
      
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
    // This is a placeholder for Supabase integration
    // In a real implementation, this would update the database
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(
        requests.map((request) =>
          request.id === requestId
            ? { ...request, status: "rejected" }
            : request
        )
      );
      
      setIsDialogOpen(false);
      
      toast({
        title: "Request rejected",
        description: "The attendance request has been rejected.",
      });
      
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error rejecting the request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
            <div className="col-span-3 md:col-span-2">Date</div>
            <div className="col-span-3 md:col-span-2">Student</div>
            <div className="hidden md:block md:col-span-2">USN</div>
            <div className="col-span-3 md:col-span-2">Subject</div>
            <div className="col-span-2 md:col-span-2">Status</div>
            <div className="col-span-1 md:col-span-2 text-right">Actions</div>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div key={request.id} className="grid grid-cols-12 p-3 border-b last:border-0 items-center">
                  <div className="col-span-3 md:col-span-2">
                    {formatDate(request.date)}
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    {getStudentName(request.studentId)}
                  </div>
                  <div className="hidden md:block md:col-span-2">
                    {getStudentUSN(request.studentId)}
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    {getSubjectName(request.subjectId)}
                  </div>
                  <div className="col-span-2 md:col-span-2">
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
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Subject</p>
                <p className="text-sm">{getSubjectName(selectedRequest.subjectId)}</p>
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
                      : "bg-red-100 text-red-800"
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
