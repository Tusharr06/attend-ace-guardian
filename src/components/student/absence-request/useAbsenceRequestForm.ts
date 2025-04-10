
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { facultyData } from "../FacultyList";

// Create subjects based on faculty data
export const getAvailableSubjects = () => facultyData.flatMap(faculty => 
  faculty.subjects.map((name, index) => ({
    id: `${faculty.id}-${index}`,
    name,
    facultyId: faculty.id
  }))
);

export const useAbsenceRequestForm = () => {
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState("");
  const [date, setDate] = useState<Date>();
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const mockSubjects = getAvailableSubjects();
  const mockFaculties = facultyData;

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

  return {
    subject,
    faculty,
    date,
    reason,
    file,
    isLoading,
    mockSubjects,
    handleFileChange,
    handleSubjectChange,
    handleSubmit,
    setDate,
    setReason,
    getFacultyName
  };
};
