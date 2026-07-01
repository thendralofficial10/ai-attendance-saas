import { Request, Response } from "express";
import {
  markAttendance,
  getAttendanceByEmployee,
  getAllAttendance,
} from "../services/attendance.service.js";

export const checkIn = async (
  req: Request,
  res: Response
) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId || isNaN(Number(employeeId))) {
      return res.status(400).json({
        success: false,
        message: "Valid employeeId is required",
      });
    }

 const attendance = await markAttendance(Number(employeeId));

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error: any) {
    if (error.message === "OUTSIDE_WINDOW") {
      return res.status(403).json({
        success: false,
        message: "Attendance can only be marked between 8:00 AM and 9:30 AM",
      });
    }

   console.error("❌ Error marking attendance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark attendance",
    });
  }
};

export const getEmployeeAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const employeeId = Number(req.params.employeeId);

    if (isNaN(employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee id",
      });
    }

    const records = await getAttendanceByEmployee(employeeId);

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("❌ Error fetching attendance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};

export const getAllAttendanceRecords = async (
  req: Request,
  res: Response
) => {
  try {
    const records = await getAllAttendance();

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("❌ Error fetching all attendance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance records",
    });
  }
};