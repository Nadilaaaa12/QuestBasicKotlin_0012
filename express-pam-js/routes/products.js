const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const connection = require("../config/database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM products ORDER BY id DESC", (err, rows) => {
    if (!err) {
      return res.status(200).json({
        status: true,
        message: "Success",
        data: rows,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  });
});

router.post(
  "/store",
  [
    body("name").notEmpty(),
    body("desc").notEmpty(),
    body("price").notEmpty(),
    body("qty").notEmpty(),
    body("category").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: errors.array(),
      });
    }

    let formData = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      qty: req.body.qty,
      category: req.body.category,
    };

    connection.query("INSERT INTO products SET ?", formData, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Product created",
          data: formData,
        });
      }
    });
  }
);

router.get("/:id", (req, res) => {
  let id = req.params.id;
  connection.query("SELECT * FROM products WHERE id = ?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      if (rows.length > 0) {
        return res.status(200).json({
          status: true,
          message: "Success",
          data: rows[0],
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "Product not found",
        });
      }
    }
  });
});

router.put(
  "/:id",
  [
    body("name").notEmpty(),
    body("desc").notEmpty(),
    body("price").notEmpty(),
    body("qty").notEmpty(),
    body("category").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: errors.array(),
      });
    }

    let id = req.params.id;
    let formData = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      qty: req.body.qty,
      category: req.body.category,
    };

    connection.query(
      "UPDATE products SET ? WHERE id = ?",
      [formData, id],
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Post updated",
            data: formData,
          });
        }
      }
    );
  }
);

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  connection.query("DELETE FROM products WHERE id = ?", id, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Products deleted",
      });
    }
  });
});

module.exports = router;
