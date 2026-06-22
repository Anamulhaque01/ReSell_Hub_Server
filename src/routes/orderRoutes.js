import express from "express";


import {

    createOrder,
    getMyOrders,
    getSellerOrders,
    updateOrderStatus

}

    from "../controllers/orderController.js";


import {

    verifyJWT

}

    from "../middleware/verifyJWT.js";



const router = express.Router();



// Create order (Buyer)

router.post(

    "/",

    verifyJWT,

    createOrder

);



// Get orders made by buyer

router.get(

    "/my-orders",

    verifyJWT,

    getMyOrders

);



// Get orders received by seller

router.get(

    "/seller-orders",

    verifyJWT,

    getSellerOrders

);



// Update order status (Seller)

router.patch(

    "/:id/status",

    verifyJWT,

    updateOrderStatus

);



export default router;