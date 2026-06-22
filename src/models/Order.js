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


        quantity: {
            type: Number,
            default: 1
        },


        totalPrice: {
            type: Number,
            required: true
        },


        shippingAddress: {
            type: String,
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
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled"
            ],

            default: "pending"
        }


    },

    {
        timestamps: true
    }


);



export const Order =
    mongoose.model(
        "Order",
        orderSchema
    );