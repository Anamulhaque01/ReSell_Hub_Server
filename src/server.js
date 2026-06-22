import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/products",
    productRoutes
);


app.get("/", (req, res) => {
    res.send("ReSell Hub Server Running");
});


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log(error);
    });


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});