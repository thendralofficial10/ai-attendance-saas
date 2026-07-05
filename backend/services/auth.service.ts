import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

const SALT_ROUNDS = 10;

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string = "employee"
) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at
  `;
  const values = [name, email, hashedPassword, role];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);

  const user = result.rows[0];

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};