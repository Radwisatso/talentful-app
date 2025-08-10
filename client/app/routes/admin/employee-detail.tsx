import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Card from "~/components/ui/Card";
import Button from "~/components/ui/Button";
import type { Route } from "./+types/employee-detail";
import { userContext } from "~/context";
import { apiClient } from "~/lib/api";
import type { Employee } from "~/lib/api";

export function meta() {
  return [{ title: "Employee Details - Admin Dashboard" }];
}

export async function clientLoader({
  context,
  params,
}: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  const employee = await apiClient.getEmployeeById(params.id);
  return { user, employee };
}

interface EditEmployeeForm {
  name: string;
  email: string;
  position: string;
  role: "ADMIN" | "EMPLOYEE";
  phoneNumber?: string;
}

export default function EmployeeDetail({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { employee } = loaderData;
  console.log(employee);

  // Mock employee data - TODO: Replace with real data from loader

  const [formData, setFormData] = useState<EditEmployeeForm>({
    name: employee.name,
    email: employee.email,
    position: employee.position,
    role: employee.role,
    phoneNumber: employee.phoneNumber || "",
  });

  const [errors, setErrors] = useState<Partial<EditEmployeeForm>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string>("");

  // Auto hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validateForm = (): boolean => {
    const newErrors: Partial<EditEmployeeForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof EditEmployeeForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await apiClient.updateEmployeeProfile(employee.id, formData);

      setNotification("Employee updated successfully!");

      // Redirect after success
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error updating employee:", error);
      setNotification("Failed to update employee. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // await apiClient.deleteEmployee(employeeId);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNotification("Employee deleted successfully!");

      // Redirect after success
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error deleting employee:", error);
      setNotification("Failed to delete employee. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Employee Details
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Edit employee information
          </p>
        </div>
      </div>

      {/* Message */}
      {notification && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            notification.includes("successfully")
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {notification}
        </div>
      )}

      {/* Employee Info Card */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {employee.photoUrl ? (
                <img
                  src={employee.photoUrl}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-gray-600">
                  {employee.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {employee.name}
              </h2>
              <p className="text-sm text-gray-500">{employee.email}</p>
              <p className="text-xs text-gray-400">
                Created: {new Date(employee.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Employee Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Position */}
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Position *
              </label>
              <input
                type="text"
                name="position"
                id="position"
                value={formData.position}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                placeholder="e.g., Frontend Developer"
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-600">{errors.position}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role *
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Phone Number */}
            <div className="sm:col-span-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDelete}
              disabled={true}
              className="px-6 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete Employee [IN PROGRESS]"}
            </button>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <Button className="px-6 py-2">
                {isLoading ? "Updating..." : "Update Employee"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
