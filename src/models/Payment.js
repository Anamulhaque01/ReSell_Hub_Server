import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema(
    {

        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },


        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },


        transactionId: {
            type: String,
            required: true
        },


        amount: {
            type: Number,
            required: true
        },


        status: {
            type: String,
            enum: [
                "pending",
                "success",
                "failed"
            ],
            default: "pending"
        }


    },
    {
        timestamps: true
    });


export const Payment = mongoose.model(
    "Payment",
    paymentSchema
);