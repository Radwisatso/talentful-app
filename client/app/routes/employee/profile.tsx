import Card from "~/components/ui/Card";
import Button from "~/components/ui/Button";
import type { Route } from "./+types/profile";
import { userContext } from "~/context";

export function meta() {
  return [{ title: "Profile - Dexa Attendance" }];
}

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return user;
}

export default function EmployeeProfile({ loaderData }: Route.ComponentProps) {
  const user = loaderData!.user;

  console.log("User Profile Data:", user);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button className="flex-1 py-2 px-4 font-medium rounded-md bg-white text-blue-600 shadow-sm">
          Profile
        </button>
        <button className="flex-1 py-2 px-4 font-medium rounded-md text-gray-600">
          Password
        </button>
      </div>

      {/* Profile Form */}
      <Card>
        <form className="space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 mb-4">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="block mx-auto text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                defaultValue={user.position || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={user.phoneNumber || ""}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          <Button className="w-full">Update Profile</Button>
        </form>
      </Card>

      {/* Password Card (Hidden for now) */}
      <div className="hidden">
        <Card>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button className="w-full">Change Password</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
