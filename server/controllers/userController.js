import { sql } from "../database/dbConfig.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const users = await sql`SELECT user_id, email FROM users`;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  delete req.user.password;
  res.status(200).json(req.user);
};

export const checkEmailExists = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updatePassword = async (req, res) => {
  const { userId } = req.params;
  const updatedHashedPassword = await bcrypt.hash(req.user.password, 10);
  try {
    const [updatedUser] =
      await sql`UPDATE users SET password = ${updatedHashedPassword} WHERE user_id = ${userId} RETURNING user_id, email`;
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await sql`DELETE FROM users WHERE user_id = ${userId}`;
    res.status(200).json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPinsForUser = async (req, res) => {
  const { userId } = req.params;
  const token = req.token;
  if (!token || token.userId !== userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }
  try {
    const [user] = await sql`SELECT * FROM users WHERE user_id = ${userId}`;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const pins =
      await sql`SELECT * FROM pins WHERE user_id = ${userId} ORDER BY completed ASC, created_at DESC`;
    return res.status(200).json(pins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
