
import { Label } from "@/components/ui/label";

interface FacultyDisplayProps {
  facultyName: string;
}

const FacultyDisplay = ({ facultyName }: FacultyDisplayProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="faculty">Faculty</Label>
      <div className="p-3 border rounded-md bg-muted/40 flex items-center">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
          {facultyName.charAt(0)}
        </div>
        <span>{facultyName}</span>
      </div>
    </div>
  );
};

export default FacultyDisplay;
