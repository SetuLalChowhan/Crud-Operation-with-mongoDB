const express = require("express");
const path = require("path");
const router = express.Router();
const productController = require(path.join(process.cwd(), "controller/productController"));
const productSchema = require(path.join(process.cwd(), "schema/productSchema"));
const validation = require(path.join(process.cwd(), "middleware/validation"));
const authenticate = require(path.join(process.cwd(), "middleware/auth"));

router.get("/", productController.homePage);

router.get("/api/products", authenticate, productController.getAllProduct);
router.get("/api/products/:id", productController.getSingleProduct);
router.post("/api/products", validation(productSchema), authenticate, productController.createProduct);
router.put("/api/products/:id", productController.updateProduct);
router.delete("/api/products/:id", productController.deleteProduct);

module.exports = router;
