import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";


// Create Order

export const createOrder = async (req, res) => {


    try {


        const {

            productId,

            quantity,

            shippingAddress


        } = req.body;



        const product =
            await Product.findById(productId);



        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }



        const order =
            await Order.create({

                buyer: req.user.id,

                seller: product.seller,

                product: product._id,

                quantity,

                totalPrice:
                    product.price * quantity,

                shippingAddress


            });



        res.status(201).json({

            message: "Order created successfully",

            order

        });



    }

    catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


};

export const getMyOrders = async (req, res) => {

    try {


        const orders =
            await Order.find({
                buyer: req.user.id
            })
                .populate(
                    "product"
                )
                .populate(
                    "seller",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });



        res.status(200).json({

            orders

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const getSellerOrders = async (req, res) => {

    try {


        const orders =
            await Order.find({

                seller: req.user.id

            })
                .populate(
                    "product"
                )
                .populate(
                    "buyer",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });



        res.status(200).json({

            orders

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const updateOrderStatus = async (req, res) => {

    try {


        const {
            status
        } = req.body;



        const order =
            await Order.findById(
                req.params.id
            );



        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }



        if (
            order.seller.toString()
            !== req.user.id
        ) {

            return res.status(403).json({

                message: "Not your order"

            });

        }



        order.orderStatus = status;


        await order.save();



        res.status(200).json({

            message: "Order status updated",

            order

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};