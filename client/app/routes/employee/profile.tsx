import { useState } from "react";
import { uploadFile } from "@uploadcare/upload-client";
import Card from "~/components/ui/Card";
import Button from "~/components/ui/Button";
import type { Route } from "./+types/profile";
import { userContext } from "~/context";
import { apiClient } from "~/lib/api";

export function meta() {
  return [{ title: "Profile - Dexa Attendance" }];
}

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return user;
}

export default function EmployeeProfile({ loaderData }: Route.ComponentProps) {
  const user = loaderData!.user;

  // Controlled form state - hanya phoneNumber dan photoUrl
  const [formData, setFormData] = useState({
    phoneNumber: user.phoneNumber || "",
    photoUrl: user.photoUrl || "", // atau user.photoUrl jika field di backend sudah photoUrl
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  // Message state
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // File preview state
  const [previewUrl, setPreviewUrl] = useState<string>(user.photoUrl || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        setMessage({ type: "success", text: "Uploading image..." });

        // Upload to Uploadcare
        const result = await uploadFile(file, {
          publicKey: "09f4ca2f9a99b00f8848",
          store: "auto",
          metadata: {
            subsystem: "uploader",
            pet: "cat",
          },
        });

        setPreviewUrl(result.cdnUrl);

        // Update photoUrl in form data
        setFormData((prev) => ({
          ...prev,
          photoUrl: result.cdnUrl,
        }));

        setMessage({ type: "success", text: "Image uploaded successfully!" });
      } catch (error) {
        setMessage({ type: "error", text: "Failed to upload image" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      console.log("Submitting profile data:", formData);

      // Call real API
      const updatedUser = await apiClient.updateProfile({
        phoneNumber: formData.phoneNumber,
        photoUrl: formData.photoUrl,
      });

      // Update localStorage with new user data
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const newUserData = {
        ...currentUser,
        phoneNumber: updatedUser.phoneNumber || formData.phoneNumber,
        photoUrl: updatedUser.photoUrl || formData.photoUrl,
      };
      localStorage.setItem("user", JSON.stringify(newUserData));

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error: any) {
      console.error("Update profile error:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 mb-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className="block mx-auto text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Read-only fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                value={user.position || ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Editable field - Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="px-6 py-2">
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
