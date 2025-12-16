import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ========================
// REGISTER USER
// ========================
export const register = async (req, res) => {
  const { full_name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (full_name,email,password,role) VALUES (?,?,?,?)",
    [full_name, email, hashedPassword, role],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User registered successfully" });
    }
  );
};

// ========================
// LOGIN USER
// ========================
export const login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.user_id, name: user.full_name, role: user.role } });
  });
};

// ========================
// GET ALL USERS (ADMIN ONLY)
// ========================
export const getUsers = (req, res) => {
  db.query("SELECT user_id, full_name, email, role, created_at FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// ========================
// GET SINGLE USER
// ========================
export const getUser = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT user_id, full_name, email, role FROM users WHERE user_id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// ========================
// UPDATE USER
// ========================
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, password, role } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  const sql = `UPDATE users SET full_name=?, email=?, password=COALESCE(?,password), role=? WHERE user_id=?`;
  db.query(sql, [full_name, email, hashedPassword, role, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User updated successfully" });
  });
};

// ========================
// DELETE USER
// ========================
export const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE user_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted successfully" });
  });
};

// ========================
// LOGOUT (CLIENT HANDLED)
// ========================
export const logout = (req, res) => {
  res.json({ message: "Logout successful on client side by deleting token" });
};
