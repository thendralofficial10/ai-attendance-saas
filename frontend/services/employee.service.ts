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

// Add this function to services/employee.service.ts
export const updateEmployeeApi = async (
  id: number,
  name: string,
  email: string,
  department: string
): Promise<Employee> => {
  const response = await api.put<ApiResponse<Employee>>(`/employees/${id}`, {
    name,
    email,
    department,
  });
  return response.data.data;
};

export const getEmployeeByEmail = async (email: string) => {
  const result = await pool.query(
    "SELECT * FROM employees WHERE email = $1",
    [email]
  );
  return result.rows[0];
};