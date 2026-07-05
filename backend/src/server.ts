import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loggerMiddleware } from "../middleware/logger.middleware.js";
import healthRoutes from "../routes/health.routes.js";
import employeeRoutes from "../routes/employee.routes.js";
import attendanceRoutes from "../routes/attendance.routes.js";
import authRoutes from "../routes/auth.routes.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use("/health", healthRoutes);
app.use("/employees", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/auth", authRoutes);


const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});