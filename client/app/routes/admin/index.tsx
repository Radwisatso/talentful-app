import Card from "~/components/ui/Card";
import Button from "~/components/ui/Button";
import type { Route } from "./+types/index";
import { userContext } from "~/context";
import StatusBadge from "./_components/StatusBadge";
import { apiClient } from "~/lib/api";
import { onValue, ref, get } from "firebase/database";
import { firebaseRealtimeDb } from "~/config/firebase";
import { useRevalidator } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export function meta() {
  return [{ title: "Admin Dashboard - Dexa Attendance" }];
}

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  const employees = await apiClient.getAllEmployees();
  return { user, employees };
}

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const { user: apiUser, employees: apiEmployees } = loaderData!;
  const user = apiUser!.user;
  const employees = apiEmployees; // Replace ini dengan data API Anda
  const revalidator = useRevalidator();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = {
    total: employees.length,
    employeeCount: employees.filter((emp) => emp.role === "EMPLOYEE").length,
    adminCount: employees.filter((emp) => emp.role === "ADMIN").length,
    withPhone: employees.filter((emp) => emp.phoneNumber).length,
  };

  const userUpdating = ref(firebaseRealtimeDb, "users/");
  onValue(userUpdating, (snapshot) => {
    const data = snapshot.exportVal();
    if (data) {
      const userData = Object.values(data)[0] as {
        email: string;
        message: string;
        profile_picture: string;
      };
      toast.success(userData.message, {
        position: "bottom-right",
        id: userData.email,
      });
    }
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Admin Dashboard
          </h1>
          <Toaster />
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user.name}
          </p>
          <p className="text-sm text-gray-400">{currentDate}</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <Button href="/admin/employees/add" className="px-4 py-2">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Employee
          </Button>
          <button
            onClick={() => revalidator.revalidate()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">Total Users</dt>
              <dd className="text-2xl font-bold text-gray-900">
                {stats.total}
              </dd>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">Employees</dt>
              <dd className="text-2xl font-bold text-green-600">
                {stats.employeeCount}
              </dd>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">Admins</dt>
              <dd className="text-2xl font-bold text-purple-600">
                {stats.adminCount}
              </dd>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">With Phone</dt>
              <dd className="text-2xl font-bold text-gray-600">
                {stats.withPhone}
              </dd>
            </div>
          </div>
        </Card>
      </div>

      {/* Employees Table */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Employee Management
            </h3>
            <div className="text-sm text-gray-500">
              Total: {employees.length} users
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={employee.role} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.phoneNumber || (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(employee.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        href={`/admin/employees/${employee.id}/edit`}
                        className="text-blue-600 hover:text-blue-200"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing all {employees.length} employees
          </div>
        </div>
      </Card>
    </div>
  );
}
