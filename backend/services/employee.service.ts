import { pool } from "../config/db.js";

export const getEmployees = async () => {
  const result = await pool.query("SELECT * FROM employees");
  return result.rows;
};

export const createEmployee = async (
  name: string,
  email: string,
  department: string
) => {
  const query = `
    INSERT INTO employees (name, email, department)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [name, email, department];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateEmployee = async (
  id: number,
  name: string,
  email: string,
  department: string
) => {
  const query = `
    UPDATE employees
    SET name = $1, email = $2, department = $3
    WHERE id = $4
    RETURNING *
  `;
  const values = [name, email, department, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteEmployee = async (id: number) => {
  const query = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *
  `;
  const values = [id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateProfileImage = async (
  id: number,
  imagePath: string
) => {
  const query = `
    UPDATE employees
    SET profile_image = $1
    WHERE id = $2
    RETURNING *
  `;
  const values = [imagePath, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};