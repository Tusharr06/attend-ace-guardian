
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAbsenceRequestForm } from "./absence-request/useAbsenceRequestForm";
import SubjectSelector from "./absence-request/SubjectSelector";
import FacultyDisplay from "./absence-request/FacultyDisplay";
import DateSelector from "./absence-request/DateSelector";
import FileUploadField from "./absence-request/FileUploadField";

const AbsenceRequestForm = () => {
  const {
    subject,
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
  } = useAbsenceRequestForm();

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
          <SubjectSelector 
            value={subject} 
            onChange={handleSubjectChange} 
            subjects={mockSubjects} 
          />
          
          <FacultyDisplay facultyName={getFacultyName()} />
          
          <DateSelector date={date} onSelect={setDate} />
          
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
          
          <FileUploadField file={file} onChange={handleFileChange} />
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
