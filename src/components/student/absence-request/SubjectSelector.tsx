
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Subject {
  id: string;
  name: string;
  facultyId: string;
}

interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
  subjects: Subject[];
}

const SubjectSelector = ({ value, onChange, subjects }: SubjectSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="subject">Subject</Label>
      <Select value={value} onValueChange={onChange}>
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
  );
};

export default SubjectSelector;
