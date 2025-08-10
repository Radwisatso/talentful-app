import Card from "~/components/ui/Card";

export function meta() {
  return [{ title: "Check In/Out - Dexa Attendance" }];
}

export default function EmployeeAttendance() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Check In / Check Out
      </h1>

      <Card>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-6">
            Clock In/Out functionality will be implemented here
          </p>
          <div className="space-y-4">
            <button className="w-full py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg">
              🟢 Check In
            </button>
            <button className="w-full py-3 border-2 border-red-600 text-red-600 hover:bg-red-50 font-medium rounded-lg">
              🔴 Check Out
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
