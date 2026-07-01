import { pool } from "../config/db.js";

const getISTTime = () => {
  const now = new Date();
  const istOffsetMinutes = 5.5 * 60;
  const istTime = new Date(now.getTime() + istOffsetMinutes * 60000 - now.getTimezoneOffset() * 60000);
  return istTime;
};

const getAttendanceStatus = (istTime: Date) => {
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const windowStart = 8 * 60;
  const lateThreshold = 9 * 60;
  const windowEnd = 9 * 60 + 30;

  if (totalMinutes < windowStart || totalMinutes > windowEnd) {
    return null;
  }

  if (totalMinutes > lateThreshold) {
    return "late";
  }

  return "present";
};

export const markAttendance = async (employeeId: number) => {
  const istTime = getISTTime();
  const status = getAttendanceStatus(istTime);

  if (!status) {
    throw new Error("OUTSIDE_WINDOW");
  }

  const query = `
    INSERT INTO attendance (employee_id, date, check_in_time, status)
    VALUES ($1, CURRENT_DATE, CURRENT_TIMESTAMP, $2)
    RETURNING *
  `;
  const values = [employeeId, status];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAttendanceByEmployee = async (employeeId: number) => {
  const query = `
    SELECT * FROM attendance
    WHERE employee_id = $1
    ORDER BY date DESC
  `;
  const values = [employeeId];

  const result = await pool.query(query, values);
  return result.rows;
};

export const getAllAttendance = async () => {
  const query = `
    SELECT attendance.*, employees.name, employees.department
    FROM attendance
    JOIN employees ON attendance.employee_id = employees.id
    ORDER BY date DESC
  `;

  const result = await pool.query(query);
  return result.rows;
};