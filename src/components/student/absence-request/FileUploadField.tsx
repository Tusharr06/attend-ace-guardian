
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface FileUploadFieldProps {
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadField = ({ file, onChange }: FileUploadFieldProps) => {
  return (
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
          onChange={onChange}
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
  );
};

export default FileUploadField;
