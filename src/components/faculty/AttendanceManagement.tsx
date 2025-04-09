
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Check, Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// Mock data for subjects
const subjects = [
  { id: "1", name: "Web Development" },
  { id: "2", name: "Database Management" },
  { id: "3", name: "Data Structures" },
];

// Mock data for students
const students = [
  { id: "1", name: "John Doe", usn: "1XX22CS001", present: true },
  { id: "2", name: "Jane Smith", usn: "1XX22CS002", present: true },
  { id: "3", name: "Robert Johnson", usn: "1XX22CS003", present: false },
  { id: "4", name: "Emily Brown", usn: "1XX22CS004", present: true },
  { id: "5", name: "Michael Wilson", usn: "1XX22CS005", present: true },
  { id: "6", name: "Sarah Taylor", usn: "1XX22CS006", present: false },
  { id: "7", name: "David Miller", usn: "1XX22CS007", present: true },
  { id: "8", name: "Jennifer Anderson", usn: "1XX22CS008", present: true },
  { id: "9", name: "Thomas Martinez", usn: "1XX22CS009", present: false },
  { id: "10", name: "Lisa Robinson", usn: "1XX22CS010", present: true },
];

const AttendanceManagement = () => {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceList, setAttendanceList] = useState(students);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleCheckboxChange = (studentId: string, checked: boolean) => {
    setAttendanceList(
      attendanceList.map((student) =>
        student.id === studentId ? { ...student, present: checked } : student
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !date) {
      toast({
        title: "Missing information",
        description: "Please select a subject and date before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // This is a placeholder for Supabase integration
    // In a real implementation, this would save to the database
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
      toast({
        title: "Attendance saved",
        description: "The attendance record has been saved successfully.",
      });
      
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Failed to save",
        description: "There was an error saving the attendance. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredStudents = attendanceList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.usn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    setAttendanceList(
      attendanceList.map((student) => ({ ...student, present: checked }))
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Attendance</CardTitle>
        <CardDescription>
          Take or update attendance for your classes
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date</Label>
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
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Students</Label>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="selectAll"
                    onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
                  />
                  <Label htmlFor="selectAll" className="text-sm">Select All</Label>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search student..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-md mt-2">
              <div className="grid grid-cols-12 p-3 border-b bg-muted/50 font-medium">
                <div className="col-span-1">Present</div>
                <div className="col-span-4">Name</div>
                <div className="col-span-7">USN</div>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-12 p-3 border-b last:border-0 items-center">
                      <div className="col-span-1">
                        <Checkbox
                          checked={student.present}
                          onCheckedChange={(checked: boolean) =>
                            handleCheckboxChange(student.id, checked)
                          }
                        />
                      </div>
                      <div className="col-span-4">{student.name}</div>
                      <div className="col-span-7">{student.usn}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No students found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Attendance
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AttendanceManagement;
