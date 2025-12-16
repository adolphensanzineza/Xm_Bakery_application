import db from "../config/db.js";

// Get all categories
export const getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Get single category
export const getCategory = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM categories WHERE category_id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

// Create category
export const createCategory = (req, res) => {
  const { category_name, description } = req.body;
  db.query(
    "INSERT INTO categories (category_name, description) VALUES (?,?)",
    [category_name, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Category created", id: result.insertId });
    }
  );
};

// Update category
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { category_name, description } = req.body;
  db.query(
    "UPDATE categories SET category_name=?, description=? WHERE category_id=?",
    [category_name, description, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Category updated" });
    }
  );
};

// Delete category
export const deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM categories WHERE category_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category deleted" });
  });
};
