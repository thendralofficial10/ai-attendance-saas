import { Router } from "express";
import {
  checkIn,
  getEmployeeAttendance,
  getAllAttendanceRecords,
} from "../controllers/attendance.controller.js";

const router = Router();

router.post("/checkin", checkIn);
router.get("/:employeeId", getEmployeeAttendance);
router.get("/", getAllAttendanceRecords);

export default router;