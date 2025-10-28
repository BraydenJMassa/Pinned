import { sql } from "../database/dbConfig.js";

export const createPin = async (req, res) => {
  const { description } = req.body;
  if (!req.token?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.token.userId;
  if (!description) {
    return res.status(400).json({ error: "Description must be provided" });
  }
  try {
    const [user] = await sql`SELECT * FROM users WHERE user_id = ${userId}`;
    if (!user) {
      return res.status(404).json({ error: "No user with specified user_id" });
    }
    const [newPin] =
      await sql`INSERT INTO pins (user_id, description) VALUES (${userId}, ${description}) RETURNING *`;
    res.status(201).json(newPin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePin = async (req, res) => {
  const pinId = req.pin.pinId;
  const { description } = req.body;
  if (!description) {
    return res
      .status(400)
      .json({ error: "Description required to update pin" });
  }
  try {
    const [newPin] =
      await sql`UPDATE pins SET description = ${description} WHERE pin_id = ${pinId} RETURNING *`;
    return res.status(200).json(newPin);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const toggleComplete = async (req, res) => {
  const pinId = req.pin.pinId;
  try {
    await sql`UPDATE pins SET completed = ${!req.pin
      .completed} WHERE pin_id = ${pinId}`;
    return res
      .status(200)
      .json({ message: '"Completed" toggled successfully for pin' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deletePin = async (req, res) => {
  const pinId = req.pin.pinId;
  try {
    await sql`DELETE FROM pins WHERE pin_id = ${pinId}`;
    return res.status(200).json({ message: "Pin deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
