import Card from "~/components/ui/Card";
import Button from "~/components/ui/Button";

export function meta() {
  return [{ title: "Employee Dashboard - Dexa Attendance" }];
}

export default function EmployeeDashboard() {
  // Get user from localStorage
  const userStr = localStorage.getItem("user") ?? null;
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Hello, {user?.name}! 👋
        </h1>
      </div>

      {/* Check In/Out Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="w-full py-4 border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg transition-colors duration-200 text-lg cursor-pointer">
          🟢 Check In
        </button>
        <button className="w-full py-4 border-2 border-red-600 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors duration-200 text-lg cursor-pointer">
          🔴 Check Out
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-lg font-semibold text-red-600">Not In</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-lg font-semibold text-gray-900">32h 15m</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-lg font-semibold text-gray-900">140h 30m</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
