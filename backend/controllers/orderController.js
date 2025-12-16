import db from "../config/db.js";

// Get all orders
export const getOrders = (req, res) => {
  const { user_id, role } = req.user;
  
  let sql = "SELECT * FROM orders WHERE user_id = ?";
  const params = [user_id];
  
  // Admin can see all orders
  if (role === "admin") {
    sql = "SELECT * FROM orders";
    params.length = 0;
  }
  
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Get single order
export const getOrder = (req, res) => {
  const { id } = req.params;
  const { user_id, role } = req.user;
  
  let sql = "SELECT * FROM orders WHERE order_id = ? AND user_id = ?";
  let params = [id, user_id];
  
  // Admin can access any order
  if (role === "admin") {
    sql = "SELECT * FROM orders WHERE order_id = ?";
    params = [id];
  }
  
  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.length) return res.status(404).json({ message: "Order not found" });
    res.json(result[0]);
  });
};

// Create order
export const createOrder = (req, res) => {
  const { user_id } = req.user;
  const { total_amount, status, items } = req.body;
  
  db.query(
    "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)",
    [user_id, total_amount, status || "pending"],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Order created", id: result.insertId });
    }
  );
};

// Update order
export const updateOrder = (req, res) => {
  const { id } = req.params;
  const { total_amount, status } = req.body;
  const { role } = req.user;
  
  // Only admins can update orders
  if (role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  db.query(
    "UPDATE orders SET total_amount = ?, status = ? WHERE order_id = ?",
    [total_amount, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Order updated" });
    }
  );
};

// Delete order
export const deleteOrder = (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  
  // Only admins can delete orders
  if (role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  db.query("DELETE FROM orders WHERE order_id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Order deleted" });
  });
};
