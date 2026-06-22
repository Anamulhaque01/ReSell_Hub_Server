import express from "express";

import {

    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct

}
    from "../controllers/productController.js";


import upload from "../middleware/upload.js";

import {
    verifyJWT
}
    from "../middleware/verifyJWT.js";


const router = express.Router();



router.post(
    "/",
    verifyJWT,
    upload.array("images", 5),
    createProduct
);



router.get(
    "/",
    getAllProducts
);



router.get(
    "/:id",
    getSingleProduct
);



router.put(
    "/:id",
    verifyJWT,
    upload.array("images", 5),
    updateProduct
);



router.delete(
    "/:id",
    verifyJWT,
    deleteProduct
);



export default router;