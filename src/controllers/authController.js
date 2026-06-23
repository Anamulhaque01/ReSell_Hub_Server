import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Uniform JWT Generation
const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET || "fallback_secret_key",
        { expiresIn: "7d" }
    );
};

// Register User
export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            location,
            phone,
            image // 👈 Comes as 'image' from your frontend form data state
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "buyer",
            location,
            phone: phone || "",
            photo: image || "" // ✅ Fixed: Map incoming 'image' string cleanly to your schema's 'photo' field
        });

        const token = generateToken(user._id, user.role);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                phone: user.phone,
                image: user.photo // ✅ Fixed: Pass back matching field structures to the frontend client
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(444).json({
                success: false,
                message: "User not found"
            });
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = generateToken(user._id, user.role);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                phone: user.phone,
                image: user.photo // ✅ Fixed: Consistently pass 'photo' back as 'image' to sync client contexts
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};