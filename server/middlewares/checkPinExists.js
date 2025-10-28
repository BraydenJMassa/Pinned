import { sql } from "../database/dbConfig.js";

const checkPinExists = async (req, res, next) => {
  const { pinId } = req.params;
  if (!pinId) {
    return res.status(400).json({ error: "pinId not found in params" });
  }
  try {
    const [pin] = await sql`SELECT * FROM pins WHERE pin_id = ${pinId}`;
    if (!pin) {
      return res.status(404).json({ error: "Pin not found" });
    }
    req.pin = pin;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default checkPinExists;
