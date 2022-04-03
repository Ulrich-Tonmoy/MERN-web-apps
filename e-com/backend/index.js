import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import stripeRoute from "./routes/stripe.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);

try {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        app.listen(PORT, () =>
            console.log(`Database connected and Server Running on Port ${PORT}`)
        );
    });
} catch (error) {
    console.log(error);
}
