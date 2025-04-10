
import { Label } from "@/components/ui/label";

interface FacultyDisplayProps {
  facultyName: string;
}

const FacultyDisplay = ({ facultyName }: FacultyDisplayProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="faculty">Faculty</Label>
      <div className="p-3 border rounded-md bg-muted/40">
        {facultyName}
      </div>
    </div>
  );
};

export default FacultyDisplay;
