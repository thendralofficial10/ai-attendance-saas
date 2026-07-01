import { Router } from "express";
import {
  getAllEmployees,
  addEmployee,
  editEmployee,
  removeEmployee,
} from "../controllers/employee.controller.js";

const router = Router();

router.get("/", getAllEmployees);
router.post("/", addEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", removeEmployee);

export default router;