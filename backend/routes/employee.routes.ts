import { Router } from "express";
import {
  getAllEmployees,
  addEmployee,
  editEmployee,
  removeEmployee,
} from "../controllers/employee.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", protect, getAllEmployees);
router.post("/", protect, adminOnly, addEmployee);
router.put("/:id", protect, adminOnly, editEmployee);
router.delete("/:id", protect, adminOnly, removeEmployee);

export default router;