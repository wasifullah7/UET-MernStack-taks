import mongoose from "mongoose";
import userData from "../model/userModel.js";
import bcrypt from "bcrypt";  
import validator from "validator"; // Ensure you import the validator package
import jwt from "jsonwebtoken"; // Ensure you import the jsonwebtoken package

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for empty fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
               
        }

        // Check if user already exists
        const userExists = await userData.findOne({ email }); // Fixed to findOne
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userData({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err); // Use console.error for logging errors
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const user = await userData.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "User logged in successfully", token });
        return token
    } catch (err) {
        console.error(err); // Use console.error for logging
        res.status(500).json({ message: "Internal server error" });
    }
};