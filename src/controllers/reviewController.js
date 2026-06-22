import { Review } from "../models/Review.js";
import { Order } from "../models/Order.js";



// Create Review

export const createReview = async (req, res) => {


    try {


        const {

            productId,

            orderId,

            rating,

            comment


        } = req.body;



        const order =
            await Order.findById(orderId);



        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }



        // Check buyer

        if (
            order.buyer.toString()
            !== req.user.id
        ) {

            return res.status(403).json({

                message: "You cannot review this order"

            });

        }



        // Check delivered

        if (
            order.orderStatus !== "delivered"
        ) {

            return res.status(400).json({

                message: "You can review only delivered orders"

            });

        }



        // Check product

        if (
            order.product.toString()
            !== productId
        ) {

            return res.status(400).json({

                message: "Product mismatch"

            });

        }



        const review =
            await Review.create({

                user: req.user.id,

                product: productId,

                order: orderId,

                rating,

                comment

            });



        res.status(201).json({

            message: "Review created",

            review

        });



    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }


};

export const getProductReviews = async (req, res) => {


    try {


        const reviews =
            await Review.find({

                product: req.params.productId

            })
                .populate(
                    "user",
                    "name photo"
                )
                .sort({

                    createdAt: -1

                });



        res.status(200).json({

            reviews

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }


};

export const deleteReview = async (req, res) => {


    try {


        const review =
            await Review.findById(
                req.params.id
            );



        if (!review) {

            return res.status(404).json({

                message: "Review not found"

            });

        }



        if (
            review.user.toString()
            !== req.user.id
        ) {

            return res.status(403).json({

                message: "Not your review"

            });

        }



        await Review.findByIdAndDelete(
            req.params.id
        );



        res.status(200).json({

            message: "Review deleted"

        });



    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }


};