import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";



// Get Dashboard Stats

export const getStats = async (req, res) => {

    try {


        const users =
            await User.countDocuments();


        const products =
            await Product.countDocuments();


        const orders =
            await Order.countDocuments();



        res.status(200).json({

            users,

            products,

            orders

        });


    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// Get All Users

export const getUsers = async (req, res) => {

    try {


        const users =
            await User.find()
                .select("-password");


        res.status(200).json({

            users

        });


    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// Get All Products

export const getProducts = async (req, res) => {

    try {


        const products =
            await Product.find()
                .populate(
                    "seller",
                    "name email"
                );


        res.status(200).json({

            products

        });


    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// Approve Product

export const approveProduct = async (req, res) => {

    try {


        const product =
            await Product.findById(
                req.params.id
            );


        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }


        product.status = "approved";


        await product.save();



        res.status(200).json({

            message: "Product approved",

            product

        });


    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// Reject Product

export const rejectProduct = async (req, res) => {

    try {


        const product =
            await Product.findById(
                req.params.id
            );


        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }


        product.status = "rejected";


        await product.save();



        res.status(200).json({

            message: "Product rejected",

            product

        });


    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};