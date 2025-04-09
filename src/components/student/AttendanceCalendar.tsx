
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - in a real app this would come from a database
const mockAttendanceData = [
  { date: new Date(2025, 3, 1), status: "present" },
  { date: new Date(2025, 3, 3), status: "present" },
  { date: new Date(2025, 3, 5), status: "present" },
  { date: new Date(2025, 3, 8), status: "absent" },
  { date: new Date(2025, 3, 10), status: "present" },
  { date: new Date(2025, 3, 12), status: "present" },
  { date: new Date(2025, 3, 15), status: "absent" },
];

const AttendanceCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDateAttendance, setSelectedDateAttendance] = useState<{ status: string } | null>(null);

  // Function to determine the day's attendance
  const isDayHighlighted = (day: Date) => {
    const foundDay = mockAttendanceData.find(
      (d) => d.date.toDateString() === day.toDateString()
    );
    return foundDay ? foundDay.status : null;
  };

  // Custom renderer for the calendar days - fixed to use proper DayContent component props
  const renderDay = (props: { date: Date; displayMonth?: Date }) => {
    const status = isDayHighlighted(props.date);
    if (!status) return null;

    return (
      <div
        className={`h-full w-full flex items-center justify-center ${
          status === "present" ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {props.date.getDate()}
      </div>
    );
  };

  const handleDateSelect = (day: Date | undefined) => {
    setDate(day);
    if (day) {
      const attendanceForDay = mockAttendanceData.find(
        (d) => d.date.toDateString() === day.toDateString()
      );
      setSelectedDateAttendance(
        attendanceForDay ? { status: attendanceForDay.status } : null
      );
    } else {
      setSelectedDateAttendance(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            components={{
              DayContent: (props) => renderDay(props),
            }}
          />
          <div className="space-y-4">
            <div className="flex items-center justify-start space-x-2 text-sm">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span>Present</span>
            </div>
            <div className="flex items-center justify-start space-x-2 text-sm">
              <div className="h-4 w-4 rounded-full bg-red-500" />
              <span>Absent</span>
            </div>
            {selectedDateAttendance && date && (
              <div className="p-4 border rounded-md mt-4">
                <h3 className="font-medium mb-2">
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <Badge
                  variant="outline"
                  className={`${
                    selectedDateAttendance.status === "present"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }`}
                >
                  {selectedDateAttendance.status === "present"
                    ? "Present"
                    : "Absent"}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCalendar;
