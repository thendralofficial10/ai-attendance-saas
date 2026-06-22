import { Request, Response } from "express";
import { getEmployees } from "../services/employee.service.js";
import { createEmployee } from "../services/employee.service.js";

export const getAllEmployees = (
  req: Request,
  res: Response
) => {
  const employees = getEmployees();

  res.status(200).json({
    success: true,
    data: employees,
  });
};

export const addEmployee = (
  req: Request,
  res: Response
) => {
  const { name, email, department } = req.body;

  const employee = createEmployee(
    name,
    email,
    department
  );

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: employee,
  });
};