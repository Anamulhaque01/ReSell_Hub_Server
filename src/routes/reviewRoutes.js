import express from "express";


import {

    createReview,
    getProductReviews,
    deleteReview

}

    from "../controllers/reviewController.js";


import {

    verifyJWT

}

    from "../middleware/verifyJWT.js";


const router =
    express.Router();



router.post(
    "/",
    verifyJWT,
    createReview
);



router.get(
    "/product/:productId",
    getProductReviews
);



router.delete(
    "/:id",
    verifyJWT,
    deleteReview
);



export default router;