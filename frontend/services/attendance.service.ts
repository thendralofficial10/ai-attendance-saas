import api from "../lib/axios";
import { Attendance, ApiResponse } from "../types";

export const checkInApi = async (employeeId: number): Promise<Attendance> => {
  const response = await api.post<ApiResponse<Attendance>>(
    "/attendance/checkin",
    { employeeId }
  );
  return response.data.data;
};

export const getAttendanceApi = async (): Promise<Attendance[]> => {
  const response = await api.get<ApiResponse<Attendance[]>>("/attendance");
  return response.data.data;
};