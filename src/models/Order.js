import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {

        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },


        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed"
            ],
            default: "pending"
        },


        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        },


        amount: {
            type: Number,
            required: true
        }


    },
    {
        timestamps: true
    });


export const Order = mongoose.model(
    "Order",
    orderSchema
);