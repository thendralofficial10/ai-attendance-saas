import { Router } from "express";
import {
  getAllEmployees,
  addEmployee,
  editEmployee,
  removeEmployee,
  uploadProfileImage,
} from "../controllers/employee.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
const router = Router();

router.get("/", protect, getAllEmployees);
router.post("/", protect, adminOnly, addEmployee);
router.put("/:id", protect, adminOnly, editEmployee);
router.delete("/:id", protect, adminOnly, removeEmployee);
router.post("/:id/upload", protect, adminOnly, upload.single("profile_image"), uploadProfileImage);

export default router;