
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { facultyData } from "./FacultyList";

// Use the actual faculty data imported from FacultyList
const mockFaculties = facultyData;

// Create subjects based on faculty data
const mockSubjects = facultyData.flatMap(faculty => 
  faculty.subjects.map((name, index) => ({
    id: `${faculty.id}-${index}`,
    name,
    facultyId: faculty.id
  }))
);

const AbsenceRequestForm = () => {
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState("");
  const [date, setDate] = useState<Date>();
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Update faculty when subject changes
  const handleSubjectChange = (subjectId: string) => {
    setSubject(subjectId);
    const selectedSubject = mockSubjects.find(s => s.id === subjectId);
    if (selectedSubject) {
      setFaculty(selectedSubject.facultyId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !date || !reason || !file || !faculty) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and upload a proof document.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get selected subject and faculty details
      const selectedSubject = mockSubjects.find(s => s.id === subject);
      const selectedFaculty = mockFaculties.find(f => f.id === faculty);
      
      // Create a request object
      const request = {
        id: crypto.randomUUID(),
        studentId: "1", // In a real app, this would be the current user's ID
        subjectId: subject,
        subjectName: selectedSubject?.name || "Unknown",
        facultyId: faculty,
        facultyName: selectedFaculty?.name || "Unknown",
        date: date?.toISOString() || new Date().toISOString(),
        reason,
        proofUrl: file.name, // In a real app, this would be a URL to the uploaded file
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the request in localStorage for demo purposes
      const existingRequests = JSON.parse(localStorage.getItem("attendanceRequests") || "[]");
      localStorage.setItem("attendanceRequests", JSON.stringify([...existingRequests, request]));
      
      setIsLoading(false);
      toast({
        title: "Request submitted",
        description: `Your absence request for ${selectedSubject?.name} has been submitted to ${selectedFaculty?.name}.`,
      });
      
      // Reset form
      setSubject("");
      setFaculty("");
      setDate(undefined);
      setReason("");
      setFile(null);
      
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get faculty name for the selected faculty
  const getFacultyName = () => {
    const selectedFaculty = mockFaculties.find(f => f.id === faculty);
    return selectedFaculty ? selectedFaculty.name : "Select a subject first";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit Absence Request</CardTitle>
        <CardDescription>
          Request approval for an absence with valid proof
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={handleSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {mockSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="faculty">Faculty</Label>
            <div className="p-3 border rounded-md bg-muted/40">
              {getFacultyName()}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Absence Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Absence</Label>
            <Textarea
              id="reason"
              placeholder="Please explain why you were absent"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proof">Upload Proof Document</Label>
            <div className="flex items-center gap-4">
              <Label
                htmlFor="proof"
                className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-secondary"
              >
                <Upload className="h-4 w-4" />
                <span>Choose file</span>
              </Label>
              <Input
                id="proof"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <span className="text-sm text-muted-foreground">
                {file ? file.name : "No file chosen"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, JPG, JPEG, PNG (max 5MB)
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AbsenceRequestForm;
