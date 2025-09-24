import Card from "~/components/ui/Card";
import { apiClient } from "~/lib/api";
import type { Route } from "./+types/history";

export function meta() {
  return [{ title: "Attendance History - Talentful Attendance" }];
}

export async function clientLoader() {
  try {
    const history = await apiClient.getAttendanceHistory();
    return history;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function EmployeeHistory({ loaderData }: Route.ComponentProps) {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle error or no data
  if (!loaderData) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Attendance History
        </h1>
        <Card>
          <div className="text-center py-8">
            <p className="text-red-600 mb-2">
              Failed to load attendance history
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  const { summary, attendancesByDate } = loaderData;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Attendance History
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Check-ins</p>
            <p className="text-2xl font-bold text-green-600">
              {summary.totalCheckin}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Check-outs</p>
            <p className="text-2xl font-bold text-red-600">
              {summary.totalCheckout}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Attendance Days</p>
            <p className="text-2xl font-bold text-blue-600">
              {summary.totalAttendanceDays}
            </p>
          </div>
        </Card>
      </div>

      {/* Records by Date */}
      {Object.keys(attendancesByDate).length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg
                className="h-12 w-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">
              No attendance records found
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Start checking in to see your attendance history
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Sort dates descending and map */}
          {Object.entries(attendancesByDate)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, records]) => (
              <Card key={date}>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {formatDate(date)}
                  </h3>
                </div>

                <div className="space-y-3">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <span
                          className={`mr-3 ${record.status === "CHECKIN" ? "text-green-600" : "text-red-600"}`}
                        >
                          {record.status === "CHECKIN" ? "🟢" : "🔴"}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {record.status === "CHECKIN"
                              ? "Check In"
                              : "Check Out"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {record.employee.name} • {record.employee.position}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatTime(record.time)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculate working hours for the day */}
                {(() => {
                  const checkinRecord = records.find(
                    (r) => r.status === "CHECKIN"
                  );
                  const checkoutRecord = records.find(
                    (r) => r.status === "CHECKOUT"
                  );

                  if (checkinRecord && checkoutRecord) {
                    const checkinTime = new Date(checkinRecord.time);
                    const checkoutTime = new Date(checkoutRecord.time);
                    const workingHours =
                      (checkoutTime.getTime() - checkinTime.getTime()) /
                      (1000 * 60 * 60);
                    const hours = Math.floor(workingHours);
                    const minutes = Math.round((workingHours - hours) * 60);

                    return (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Working Hours:</span>
                          <span className="font-medium text-gray-900">
                            {hours}h {minutes}m
                          </span>
                        </div>
                      </div>
                    );
                  } else if (checkinRecord && !checkoutRecord) {
                    return (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium text-yellow-600">
                            In Progress
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
