import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },


        condition: {
            type: String,
            enum: [
                "Used",
                "Like New",
                "Refurbished"
            ],
            required: true
        },


        price: {
            type: Number,
            required: true
        },


        images: [
            {
                type: String
            }
        ],


        description: {
            type: String,
            required: true
        },


        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected"
            ],
            default: "pending"
        },


        stock: {
            type: Number,
            default: 1
        }


    },
    {
        timestamps: true
    });


export const Product = mongoose.model(
    "Product",
    productSchema
);