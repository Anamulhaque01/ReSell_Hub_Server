import express from "express";
import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

import upload from "../middleware/upload.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyRole } from "../middleware/verifyRole.js"; // ✅ Imported your role check middleware

const router = express.Router();

// 1. Create Product -> Secured so ONLY a verified Seller can add listings[cite: 1]
router.post(
    "/",
    verifyJWT,
    verifyRole("seller"), // ✅ Enforces that req.user.role must match "seller"[cite: 1]
    upload.array("images", 5),
    createProduct
);

// 2. Get All Products -> Publicly open for browsing (Buyers, Sellers, Guests)[cite: 1]
router.get(
    "/",
    getAllProducts
);

// 3. Get Single Product -> Publicly open for browsing product details[cite: 1]
router.get(
    "/:id",
    getSingleProduct
);

// 4. Update Product -> Secured so ONLY a verified Seller can modify listings[cite: 1]
router.put(
    "/:id",
    verifyJWT,
    verifyRole("seller"), // ✅ Restricts modification endpoints[cite: 1]
    upload.array("images", 5),
    updateProduct
);

// 5. Delete Product -> Secured so ONLY a verified Seller (or Admin if desired) can delete listings[cite: 1]
router.delete(
    "/:id",
    verifyJWT,
    verifyRole("seller", "admin"), // ✅ Allows both the listing Seller and the Admin to clear a product entry[cite: 1]
    deleteProduct
);

export default router;