import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User does not exist" });

        const isPasswordConfirmed = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordConfirmed) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "social", {
            expiresIn: "2d",
        });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const singup = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(404).json({ message: "User already exist" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await UserModal.create({
            email,
            password: hashedPassword,
            name: fullName,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, "social", {
            expiresIn: "2d",
        });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
