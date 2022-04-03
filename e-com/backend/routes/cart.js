import express from "express";
import {
    verifyToken,
    verifyTokenAdmin,
    verifyTokenAuthorization,
} from "../middleware/verifyToken.js";
import Cart from "./../models/Cart.js";

const router = express.Router();

// Get all
router.get("/", verifyTokenAdmin, async (req, res) => {
    try {
        const cart = await Cart.find();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create Cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Cart by id
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete Cart by id
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get Cart by user id
router.get("/:userId", verifyTokenAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
