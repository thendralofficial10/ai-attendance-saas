export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  profile_image: string | null;
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Attendance {
  id: number;
  employee_id: number;
  date: string;
  check_in_time: string;
  status: "present" | "late" | "absent";
  created_at: string;
  name?: string;
  department?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}