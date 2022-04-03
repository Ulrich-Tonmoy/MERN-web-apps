import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/registration", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_ENCRYPTION_SECRET
        ).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user &&
            res.status(404).json({ error: "You dont have an account or the give email is wrong" });

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_ENCRYPTION_SECRET
        ).toString(CryptoJS.enc.Utf8);

        hashedPassword != req.body.password && res.status(404).json({ error: "Wrong password" });

        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const { password, ...others } = user._doc;
        res.status(201).json({ ...others, token });
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
