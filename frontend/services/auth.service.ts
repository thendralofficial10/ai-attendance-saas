import api from "../lib/axios";
import { AuthResponse, ApiResponse } from "../types";

export const loginApi = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    { email, password }
  );
  return response.data.data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
  role: string = "employee"
): Promise<void> => {
  await api.post("/auth/register", { name, email, password, role });
};