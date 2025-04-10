
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [loginType, setLoginType] = useState<"student" | "faculty">("student");

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

        <Tabs 
          value={loginType} 
          onValueChange={(value) => setLoginType(value as "student" | "faculty")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student Login</TabsTrigger>
            <TabsTrigger value="faculty">Faculty Login</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <LoginForm role="student" />
          </TabsContent>
          <TabsContent value="faculty">
            <LoginForm role="faculty" />
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8">
          <CardContent className="p-4 text-sm">
            <h3 className="font-semibold mb-2">Login Credentials</h3>
            <p className="text-muted-foreground mb-1">Use these credentials to login:</p>
            <div>
              <h4 className="font-medium mt-2">Student Accounts:</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>John Doe: <span className="font-medium">john.doe@student.edu / password123</span></li>
                <li>Sarah Chen: <span className="font-medium">sarah.chen@student.edu / password123</span></li>
              </ul>
              
              <h4 className="font-medium mt-2">Faculty Accounts:</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Prof. Johnson: <span className="font-medium">johnson@faculty.edu / password123</span></li>
                <li>Prof. Williams: <span className="font-medium">williams@faculty.edu / password123</span></li>
                <li>Prof. Davis: <span className="font-medium">davis@faculty.edu / password123</span></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
