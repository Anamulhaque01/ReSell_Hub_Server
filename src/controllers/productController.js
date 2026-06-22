import { Product } from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";


// Create Product

export const createProduct = async (req, res) => {


    try {


        const {
            title,
            category,
            condition,
            price,
            description,
            stock

        } = req.body;



        let imageUrls = [];



        if (req.files) {

            for (const file of req.files) {


                const result =
                    await new Promise((resolve, reject) => {


                        cloudinary.uploader
                            .upload_stream(

                                {
                                    folder: "resellhub/products"
                                },

                                (error, result) => {

                                    if (error)
                                        reject(error);

                                    else
                                        resolve(result);

                                }

                            )

                            .end(file.buffer);


                    });


                imageUrls.push(result.secure_url);


            }

        }



        const product =
            await Product.create({

                title,

                category,

                condition,

                price,

                description,

                stock,

                images: imageUrls,

                seller: req.user.id


            });



        res.status(201).json({

            message: "Product created successfully",

            product

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });


    }


};

export const getAllProducts = async (req, res) => {

    try {

        const {
            search,
            category,
            condition,
            minPrice,
            maxPrice,
            sort
        } = req.query;



        let filter = {};



        // Search by title or description

        if (search) {

            filter.$or = [

                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ];

        }



        // Category filter

        if (category) {

            filter.category = category;

        }



        // Condition filter

        if (condition) {

            filter.condition = condition;

        }



        // Price filter

        if (minPrice || maxPrice) {

            filter.price = {};

            if (minPrice) {

                filter.price.$gte = Number(minPrice);

            }


            if (maxPrice) {

                filter.price.$lte = Number(maxPrice);

            }

        }



        let query = Product.find(filter)
            .populate(
                "seller",
                "name email photo"
            );



        // Sorting

        if (sort === "price_low") {

            query = query.sort({
                price: 1
            });

        }


        else if (sort === "price_high") {

            query = query.sort({
                price: -1
            });

        }


        else {

            query = query.sort({
                createdAt: -1
            });

        }



        const products = await query;



        res.status(200).json({

            count: products.length,

            products

        });



    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const getSingleProduct = async (req, res) => {

    try {

        const product =
            await Product.findById(req.params.id)
                .populate(
                    "seller",
                    "name email photo"
                );


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        res.status(200).json({
            product
        });


    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const updateProduct = async (req, res) => {

    try {


        const product =
            await Product.findById(req.params.id);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        if (
            product.seller.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message: "Not your product"
            });

        }



        const updatedProduct =
            await Product.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }

            );


        res.status(200).json({

            message: "Product updated",

            product: updatedProduct

        });


    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const deleteProduct = async (req, res) => {

    try {


        const product =
            await Product.findById(req.params.id);



        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }



        if (
            product.seller.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message: "Not your product"
            });

        }



        await Product.findByIdAndDelete(
            req.params.id
        );



        res.status(200).json({

            message: "Product deleted"

        });



    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};