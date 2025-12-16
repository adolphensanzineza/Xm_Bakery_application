import db from "../config/db.js";

// Get all products
export const getProducts = (req, res) => {
  db.query(
    "SELECT p.product_id, p.product_name, p.price, p.stock, c.category_name FROM products p JOIN categories c ON p.category_id=c.category_id",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// Get single product
export const getProduct = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE product_id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

// Create product
export const createProduct = (req, res) => {
  const { product_name, price, stock, category_id } = req.body;
  db.query(
    "INSERT INTO products (product_name, price, stock, category_id) VALUES (?,?,?,?)",
    [product_name, price, stock, category_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product created", id: result.insertId });
    }
  );
};

// Update product
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { product_name, price, stock, category_id } = req.body;
  db.query(
    "UPDATE products SET product_name=?, price=?, stock=?, category_id=? WHERE product_id=?",
    [product_name, price, stock, category_id, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product updated" });
    }
  );
};

// Delete product
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE product_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted" });
  });
};
