
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { GraduationCap, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Faculty data type definition
export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
}

// Real faculty data that will be used across the application
export const facultyData: Faculty[] = [
  { 
    id: "f001", 
    name: "Dr. Robert Smith", 
    email: "robert.smith@university.edu", 
    department: "Computer Science",
    subjects: ["Web Development", "Database Management"]
  },
  { 
    id: "f002", 
    name: "Prof. Jennifer Lee", 
    email: "jennifer.lee@university.edu", 
    department: "Computer Science",
    subjects: ["Data Structures", "Computer Networks"]
  },
  { 
    id: "f003", 
    name: "Dr. Michael Johnson", 
    email: "michael.johnson@university.edu", 
    department: "Mathematics",
    subjects: ["Discrete Mathematics", "Algorithms"]
  },
  { 
    id: "f004", 
    name: "Prof. Elizabeth Taylor", 
    email: "elizabeth.taylor@university.edu", 
    department: "Computer Science",
    subjects: ["Operating Systems", "Computer Architecture"]
  }
];

const FacultyList = () => {
  const [faculties, setFaculties] = useState(facultyData);
  const [loading, setLoading] = useState(false);

  // In a real implementation, this would fetch data from Supabase
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        setLoading(true);
        // Placeholder for API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Initialize faculty accounts in Supabase if using demo mode
        const userEmail = localStorage.getItem("userEmail");
        const isDemoMode = userEmail === "demo.faculty@example.com";
        
        if (isDemoMode) {
          // Create faculty accounts in localStorage for demo
          localStorage.setItem("facultyAccounts", JSON.stringify(facultyData));
        }
        
        setFaculties(facultyData);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8">Loading faculty data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faculties.map((faculty) => (
            <div key={faculty.id} className="flex items-start gap-4 p-4 border rounded-md">
              <Avatar className="h-12 w-12 bg-primary/10 text-primary">
                <GraduationCap className="h-6 w-6" />
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-lg font-medium leading-none">{faculty.name}</h3>
                <p className="text-sm text-muted-foreground">{faculty.department}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-1 h-4 w-4" />
                  {faculty.email}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {faculty.subjects.map((subject, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyList;
