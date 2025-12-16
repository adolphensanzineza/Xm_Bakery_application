import db from "../config/db.js";
import bcrypt from "bcrypt";

// Get all users (admin only)
export const getUsers = (req, res) => {
  db.query("SELECT user_id, full_name, email, role, created_at FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Get single user
export const getUser = (req, res) => {
  const { id } = req.params;
  db.query("SELECT user_id, full_name, email, role FROM users WHERE user_id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// Create user (admin only)
export const createUser = async (req, res) => {
  const { full_name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (full_name, email, password, role) VALUES (?,?,?,?)",
    [full_name, email, hashedPassword, role],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User created", id: result.insertId });
    }
  );
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, password, role } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  const sql = `UPDATE users SET full_name=?, email=?, password=COALESCE(?,password), role=? WHERE user_id=?`;
  db.query(sql, [full_name, email, hashedPassword, role, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User updated" });
  });
};

// Delete user
export const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE user_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
};
