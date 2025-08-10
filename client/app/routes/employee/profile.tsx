import Card from "~/components/ui/Card";

export function meta() {
  return [{ title: "Profile - Dexa Attendance" }];
}

export default function EmployeeProfile() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-sm text-gray-900">{user?.name || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{user?.email || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <p className="mt-1 text-sm text-gray-900">{user?.role || "N/A"}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
