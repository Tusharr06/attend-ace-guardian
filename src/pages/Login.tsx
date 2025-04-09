
import LoginForm from "@/components/auth/LoginForm";

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
      </div>
    </div>
  );
};

export default Login;
