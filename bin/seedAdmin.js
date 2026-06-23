import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../src/models/User.js"; // ✅ Updated to target your src folder path

dotenv.config();

const seedAdmin = async () => {
    try {
        // 1. Connect to your MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🔄 Database connected for seeding...");

        // 2. Define default credentials
        const adminEmail = "admin@resellhub.com";
        const adminPassword = "password123";

        // 3. Check if admin exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log(`⚠️ Admin account already exists with email: ${adminEmail}`);
            process.exit(0);
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // 5. Create the default admin
        // ... upper part of your script stays exactly the same ...

        // 5. Create the default admin
        await User.create({
            name: "System Administrator",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            location: "Khulna, BD",
            phone: "01700000000",
            // ✅ Add a default avatar image URL here:
            photo: "https://images.unsplash.com/photo-1474377207190-a7d8b3334068?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            status: "active"
        });

        // ... rest of your script stays exactly the same ...

        console.log("✅ Default admin account seeded successfully!");
        console.log(`📧 Email: ${adminEmail}`);
        console.log(`🔑 Password: ${adminPassword}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding admin user:", error.message);
        process.exit(1);
    }
};

seedAdmin();