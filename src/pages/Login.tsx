
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            AttendAce Guardian
          </h1>
          <p className="text-muted-foreground">
            Login to access your attendance dashboard
          </p>
        </div>
        <LoginForm />
        
        <Card className="mt-8">
          <CardContent className="p-4 text-sm">
            <h3 className="font-semibold mb-2">Available Faculty Accounts</h3>
            <p className="text-muted-foreground mb-1">Use these credentials to login as faculty:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Prof. Johnson: <span className="font-medium">johnson@faculty.edu / password123</span></li>
              <li>Prof. Williams: <span className="font-medium">williams@faculty.edu / password123</span></li>
              <li>Prof. Davis: <span className="font-medium">davis@faculty.edu / password123</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
