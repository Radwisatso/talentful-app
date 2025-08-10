import Button from "~/components/ui/Button";
import type { Route } from "./+types/login";
import { Form, redirect } from "react-router";
import { apiClient, type ApiError } from "~/lib/api";

export function meta() {
  return [{ title: "Login - Dexa Attendance System" }];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "Email and password are required.",
      fields: { email, password },
    };
  }
  /*
  {
      "email": "john.doe@company.com",
      "password": "password123"
  }
  */
  try {
    const loginResponse = await apiClient.login({ email, password });
    localStorage.setItem("accessToken", loginResponse.access_token);
    return redirect("/");
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    return {
      error: "Login failed.",
      fields: { email, password },
    };
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <div className="py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Login Page
        </h1>
        {actionData?.error && (
          <div className="mt-4 text-red-600 text-center">
            {actionData.error}
          </div>
        )}
        <Form method="post" className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Sign In
          </button>
        </Form>
        <div className="mt-6 text-center">
          <Button href="/" className="text-blue-600 hover:text-blue-500">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
