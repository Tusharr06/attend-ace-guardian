
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import { LogOut, User } from "lucide-react";

const MainNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const userRole = localStorage.getItem("userRole") as UserRole | null;
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Only show nav when user is logged in
  if (!userRole || location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              AttendAce
            </span>
          </Link>
          <nav className="flex gap-6">
            {userRole === "student" ? (
              <>
                <Link
                  to="/student-dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.includes("/student-dashboard")
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/attendance-records"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.includes("/attendance-records")
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  Attendance
                </Link>
                <Link
                  to="/attendance-requests"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.includes("/attendance-requests")
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  Requests
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/faculty-dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.includes("/faculty-dashboard")
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-attendance"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.includes("/manage-attendance")
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  Manage Attendance
                </Link>
                <Link
                  to="/approval-requests"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.includes("/approval-requests")
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  Requests
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm hidden md:inline">{userEmail}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-foreground/60 hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
