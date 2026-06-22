import express from "express";


import {

    getStats,
    getUsers,
    getProducts,
    approveProduct,
    rejectProduct

}

    from "../controllers/adminController.js";


import {
    verifyJWT
}
    from "../middleware/verifyJWT.js";


import {
    isAdmin
}
    from "../middleware/isAdmin.js";



const router = express.Router();



router.use(
    verifyJWT,
    isAdmin
);



router.get(
    "/stats",
    getStats
);



router.get(
    "/users",
    getUsers
);



router.get(
    "/products",
    getProducts
);



router.patch(
    "/products/:id/approve",
    approveProduct
);



router.patch(
    "/products/:id/reject",
    rejectProduct
);



export default router;