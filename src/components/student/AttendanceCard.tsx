
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AttendanceStats } from "@/types";
import { cn } from "@/lib/utils";

interface AttendanceCardProps {
  subject: string;
  stats: AttendanceStats;
}

const AttendanceCard = ({ subject, stats }: AttendanceCardProps) => {
  // Calculate color based on attendance percentage
  const getColorClass = (percentage: number) => {
    if (percentage >= 75) return "text-green-500";
    if (percentage >= 65) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 65) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Attendance</span>
            <span className={`font-medium ${getColorClass(stats.percentage)}`}>
              {stats.percentage}%
            </span>
          </div>
          <Progress 
            value={stats.percentage} 
            className={cn("h-2", getProgressColor(stats.percentage))}
          />
          <div className="grid grid-cols-3 text-sm mt-2">
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-medium">{stats.totalClasses}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Present</p>
              <p className="font-medium text-green-500">{stats.present}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Absent</p>
              <p className="font-medium text-red-500">{stats.absent}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
