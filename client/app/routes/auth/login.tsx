import Button from "~/components/ui/Button";
import type { Route } from "./+types/login";

export function meta() {
  return [{ title: "Login - Dexa Attendance System" }];
}

export default function Login() {
  return (
    <div className="py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Login Page
        </h1>
        <p className="text-center text-gray-600 mt-4">
          This is the login page - testing if it renders
        </p>
        <div className="mt-6 text-center">
          <Button href="/" className="text-blue-600 hover:text-blue-500">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
