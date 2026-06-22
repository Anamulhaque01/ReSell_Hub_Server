import express from "express";

import {
    createProduct
}
    from "../controllers/productController.js";

import upload from "../middleware/upload.js";

import { verifyJWT }
    from "../middleware/verifyJWT.js";


const router = express.Router();



router.post(

    "/",

    verifyJWT,

    upload.array("images", 5),

    createProduct

);



export default router;