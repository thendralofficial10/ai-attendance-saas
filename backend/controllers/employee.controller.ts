import { Request, Response } from "express";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../services/employee.service.js";
export const getAllEmployees = async (
  req: Request,
  res: Response
) => {
  try {
    const employees = await getEmployees();
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

export const addEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, department } = req.body;
      
    if (!name || !email || !department) {
      return res.status(400).json({
        success: false,
        message: "name, email, and department are all required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const employee = await createEmployee(name, email, department);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error("❌ Error creating employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};

export const editEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    
     if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee id",
      });
    }

    const { name, email, department } = req.body;

    if (!name || !email || !department) {
      return res.status(400).json({
        success: false,
        message: "name, email, and department are all required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const employee = await updateEmployee(id, name, email, department);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update employee",
    });
  }
};

export const removeEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const employee = await deleteEmployee(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: employee,
    });
  } catch (error) {
    console.error("❌ Error deleting employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete employee",
    });
  }
};