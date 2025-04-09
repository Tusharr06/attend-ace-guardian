
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            AttendAce Guardian
          </h1>
          <p className="text-muted-foreground">
            Create your account to get started
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
