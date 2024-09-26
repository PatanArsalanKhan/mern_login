require('dotenv').config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const Registeruser = require("./model"); // User schema
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Password hashing
const middleware = require("./middleware"); // JWT verification middleware
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

const port = process.env.PORT || 8080; // Use environment variable for port
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey"; // Store sensitive data in environment variables

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "your-mongodb-connection-string"; // Use environment variable for MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connection established"))
    .catch((error) => {
        console.error("Database connection failed:", error.message); // Show error message, hide connection details
    });

// Route for user registration
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;

        // Check if user already exists
        let exist = await Registeruser.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        let newUser = new Registeruser({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(200).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route for user login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await Registeruser.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const payload = {
            user: { id: user.id }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: "59s" }, (error, token) => {
            if (error) throw error;
            return res.json({ token });
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Protected route to get the user's profile
app.get("/myprofile", middleware, async (req, res) => {
    try {
        let user = await Registeruser.findById(req.user.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send back the user's username and email
        res.json({ username: user.username, email: user.email });

    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
