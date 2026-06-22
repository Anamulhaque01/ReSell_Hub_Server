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