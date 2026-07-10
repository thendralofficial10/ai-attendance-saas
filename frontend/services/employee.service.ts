import api from "../lib/axios";
import { Employee, ApiResponse } from "../types";

export const getEmployeesApi = async (): Promise<Employee[]> => {
  const response = await api.get<ApiResponse<Employee[]>>("/employees");
  return response.data.data;
};

export const createEmployeeApi = async (
  name: string,
  email: string,
  department: string
): Promise<Employee> => {
  const response = await api.post<ApiResponse<Employee>>("/employees", {
    name,
    email,
    department,
  });
  return response.data.data;
};

export const deleteEmployeeApi = async (id: number): Promise<void> => {
  await api.delete(`/employees/${id}`);
};