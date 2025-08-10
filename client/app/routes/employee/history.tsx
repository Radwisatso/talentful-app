import Card from "~/components/ui/Card";

export function meta() {
  return [{ title: "Attendance History - Dexa Attendance" }];
}

export default function EmployeeHistory() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Attendance History
      </h1>

      <Card>
        <div className="text-center py-8">
          <p className="text-gray-600">No attendance records found</p>
          <p className="text-sm text-gray-500 mt-2">
            Your attendance history will appear here
          </p>
        </div>
      </Card>
    </div>
  );
}
