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
  };
}

// Response structure sesuai dengan actual response Anda
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

  // Get attendance history via summary endpoint
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
}

export const apiClient = new ApiClient(API_BASE_URL);
export type {
  LoginCredentials,
  LoginResponse,
  AttendanceRecord,
  AttendanceSummaryResponse,
};
