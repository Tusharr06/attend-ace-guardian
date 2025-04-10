
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Faculty data for the application
export const facultyData = [
  {
    id: "faculty1",
    name: "Prof. Johnson",
    email: "johnson@faculty.edu",
    department: "Computer Science",
    subjects: ["Web Development", "Mobile App Development", "Cloud Computing"]
  },
  {
    id: "faculty2",
    name: "Prof. Williams",
    email: "williams@faculty.edu",
    department: "Information Technology",
    subjects: ["Database Management", "Big Data Analytics", "Network Security"]
  },
  {
    id: "faculty3",
    name: "Prof. Davis",
    email: "davis@faculty.edu",
    department: "Electrical Engineering",
    subjects: ["Data Structures", "Computer Architecture", "Operating Systems"]
  }
];

// The actual FacultyList component
const FacultyList: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {facultyData.map((faculty) => (
        <Card key={faculty.id} className="p-5 overflow-hidden">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border bg-primary/10">
              <div className="text-lg font-semibold">{faculty.name.charAt(0)}</div>
            </Avatar>
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-lg">{faculty.name}</h3>
              <p className="text-sm text-muted-foreground">{faculty.email}</p>
              <Badge variant="outline" className="mt-1">
                {faculty.department}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Teaching Subjects</h4>
            <div className="flex flex-wrap gap-2">
              {faculty.subjects.map((subject, index) => (
                <Badge key={index} variant="secondary">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FacultyList;
