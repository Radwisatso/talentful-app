const API_BASE_URL = "http://localhost:3000";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "EMPLOYEE" | "ADMIN";
    position?: string;
    phoneNumber?: string;
    photoUrl?: string;
  };
}

interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;
  time: string;
  status: "CHECKIN" | "CHECKOUT";
  createdAt: string;
  employee: {
    id: number;
    name: string;
    email: string;
    position: string;
  };
}

interface AttendanceSummaryResponse {
  attendances: AttendanceRecord[];
  attendancesByDate: Record<string, AttendanceRecord[]>;
  summary: {
    totalCheckin: number;
    totalCheckout: number;
    totalAttendanceDays: number;
    period: {
      startDate: string;
      endDate: string;
    };
  };
}

interface UpdateProfileData {
  phoneNumber?: string;
  photoUrl?: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// ===== Employee Interface for getAllEmployees =====
interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  role: "ADMIN" | "EMPLOYEE";
  phoneNumber?: string;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Add interface for Create Employee request
interface CreateEmployeeRequest {
  name: string;
  email: string;
  password: string;
  position: string;
  role: "ADMIN" | "EMPLOYEE";
  phoneNumber?: string;
}

// Add interface for Update Employee Profile request
interface UpdateEmployeeProfileRequest {
  name?: string;
  email?: string;
  position?: string;
  phoneNumber?: string;
  role?: "ADMIN" | "EMPLOYEE";
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  }

  async getAttendanceHistory(): Promise<AttendanceSummaryResponse> {
    const response = await fetch(
      `${this.baseURL}/attendances/summary?startDate=2025-01-01&endDate=2025-12-31`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeader(),
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch attendance history");
    }

    return data;
  }

  // Check-in
  async checkIn(): Promise<AttendanceRecord> {
    const now = new Date();
    const response = await fetch(`${this.baseURL}/attendances/checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify({
        date: now.toISOString(),
        time: now.toISOString(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to check in");
    }

    return data;
  }

  // Check-out
  async checkOut(): Promise<AttendanceRecord> {
    const now = new Date();
    const response = await fetch(`${this.baseURL}/attendances/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify({
        date: now.toISOString(),
        time: now.toISOString(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to check out");
    }

    return data;
  }

  // Get today's attendance status
  async getTodayAttendance(): Promise<AttendanceSummaryResponse> {
    const now = new Date();

    // Start of today (00:00:00)
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    // End of today (23:59:59)
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    // Format to YYYY-MM-DDT17:00:00.000Z for API
    const startDate = startOfDay.toISOString();
    const endDate = endOfDay.toISOString();

    const response = await fetch(
      `${this.baseURL}/attendances/summary?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeader(),
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch today attendance");
    }
    console.log("Today Attendance Data:", data);
    return data;
  }

  // Update employee profile
  async updateProfile(
    profileData: UpdateProfileData
  ): Promise<LoginResponse["user"]> {
    // Get user ID from localStorage
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user?.id) {
      throw new Error("User not found in localStorage");
    }

    const response = await fetch(
      `${this.baseURL}/employees/${user.id}/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeader(),
        },
        body: JSON.stringify(profileData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    return data;
  }

  // Change password - sesuai dengan endpoint di employee.http
  async changePassword(passwordData: ChangePasswordData): Promise<void> {
    // Get user ID from localStorage
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user?.id) {
      throw new Error("User not found in localStorage");
    }

    const response = await fetch(
      `${this.baseURL}/employees/${user.id}/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeader(),
        },
        body: JSON.stringify(passwordData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to change password");
    }
  }

  // ===== Simple getAllEmployees =====
  async getAllEmployees(): Promise<Employee[]> {
    const response = await fetch(`${this.baseURL}/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch employees");
    }

    return data;
  }

  // ===== Admin Get All Attendances (Admin Only) =====
  async getAllAttendances(): Promise<AttendanceRecord[]> {
    const response = await fetch(`${this.baseURL}/attendances/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch all attendances");
    }

    return data;
  }

  // ===== Create New Employee (Admin Only) =====
  async createEmployee(employeeData: CreateEmployeeRequest): Promise<Employee> {
    const response = await fetch(`${this.baseURL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(employeeData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create employee");
    }

    return data;
  }

  // ===== Get Employee by ID (Admin Only) =====
  async getEmployeeById(employeeId: string | number): Promise<Employee> {
    const response = await fetch(`${this.baseURL}/employees/${employeeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch employee");
    }

    return data;
  }

  // ===== Admin Update Any Employee Profile ✅
  async updateEmployeeProfile(
    employeeId: string | number,
    profileData: UpdateEmployeeProfileRequest
  ): Promise<Employee> {
    const response = await fetch(
      `${this.baseURL}/employees/${employeeId}/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeader(),
        },
        body: JSON.stringify(profileData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update employee profile");
    }

    return data;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export type {
  LoginCredentials,
  LoginResponse,
  AttendanceRecord,
  AttendanceSummaryResponse,
  UpdateProfileData,
  ChangePasswordData,
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeProfileRequest,
};
