import { useState, useEffect } from "react";
import Card from "~/components/ui/Card";
import type { Route } from "./+types/index";
import { userContext } from "~/context";
import Button from "~/components/ui/Button";
import { apiClient, type AttendanceSummaryResponse } from "~/lib/api";

export function meta() {
  return [{ title: "Employee Dashboard - Dexa Attendance" }];
}

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return user;
}

export default function EmployeeDashboard({
  loaderData,
}: Route.ComponentProps) {
  const [todayData, setTodayData] = useState<AttendanceSummaryResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const user = loaderData!.user;

  // Real-time clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchTodayData = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getTodayAttendance();
      setTodayData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayData();
  }, []);

  const handleCheckIn = async () => {
    try {
      setActionLoading(true);
      await apiClient.checkIn();
      // Refresh today's data
      await fetchTodayData();
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to check in");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setActionLoading(true);
      await apiClient.checkOut();
      // Refresh today's data
      await fetchTodayData();
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to check out");
    } finally {
      setActionLoading(false);
    }
  };

  const getTodayStatus = () => {
    if (!todayData || Object.keys(todayData.attendancesByDate).length === 0) {
      return {
        status: "NOT_STARTED",
        text: "Not Checked In",
        color: "text-red-600",
      };
    }

    const todayRecords = Object.values(todayData.attendancesByDate)[0] || [];
    const hasCheckin = todayRecords.some((r) => r.status === "CHECKIN");
    const hasCheckout = todayRecords.some((r) => r.status === "CHECKOUT");

    if (hasCheckin && hasCheckout) {
      return {
        status: "COMPLETE",
        text: "Work Complete",
        color: "text-green-600",
      };
    } else if (hasCheckin && !hasCheckout) {
      return {
        status: "IN_PROGRESS",
        text: "Checked In",
        color: "text-yellow-600",
      };
    } else {
      return {
        status: "NOT_STARTED",
        text: "Not Checked In",
        color: "text-red-600",
      };
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatCurrentTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatCurrentDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const todayStatus = getTodayStatus();
  const canCheckIn = todayStatus.status === "NOT_STARTED";
  const canCheckOut = todayStatus.status === "IN_PROGRESS";

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Hello, {user?.name}! 👋
        </h1>
        <Card>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Hello, {user.name} 👋
        </h1>
        <div className="text-gray-600 mt-1">
          <p>{formatCurrentDate(currentTime)}</p>
          <p className="text-lg font-mono font-medium text-blue-600">
            {formatCurrentTime(currentTime)}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Check In/Out Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleCheckIn}
          disabled={!canCheckIn || actionLoading}
          className={`w-full py-4 border-2 font-medium rounded-lg transition-colors duration-200 text-lg ${
            canCheckIn && !actionLoading
              ? "border-green-600 text-green-600 hover:bg-green-50"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          {actionLoading ? "⏳" : "🟢"} Check In
        </button>

        <button
          onClick={handleCheckOut}
          disabled={!canCheckOut || actionLoading}
          className={`w-full py-4 border-2 font-medium rounded-lg transition-colors duration-200 text-lg ${
            canCheckOut && !actionLoading
              ? "border-red-600 text-red-600 hover:bg-red-50"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          {actionLoading ? "⏳" : "🔴"} Check Out
        </button>
      </div>

      {/* Status Cards - RESPONSIVE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-center p-2 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              Today's Status
            </p>
            <p
              className={`text-sm sm:text-lg font-semibold ${todayStatus.color}`}
            >
              {todayStatus.text}
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center p-2 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              Check-ins Today
            </p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              {todayData?.summary.totalCheckin || 0}
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center p-2 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              Check-outs Today
            </p>
            <p className="text-xl sm:text-2xl font-bold text-red-600">
              {todayData?.summary.totalCheckout || 0}
            </p>
          </div>
        </Card>
      </div>

      {/* Today's Records */}
      {todayData && Object.keys(todayData.attendancesByDate).length > 0 && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Today's Activity
          </h2>
          <div className="space-y-2">
            {Object.values(todayData.attendancesByDate)[0]?.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <span
                    className={`mr-2 ${record.status === "CHECKIN" ? "text-green-600" : "text-red-600"}`}
                  >
                    {record.status === "CHECKIN" ? "🟢" : "🔴"}
                  </span>
                  <span className="font-medium">
                    {record.status === "CHECKIN" ? "Check In" : "Check Out"}
                  </span>
                </div>
                <span className="text-gray-600 font-medium">
                  {formatTime(record.time)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
