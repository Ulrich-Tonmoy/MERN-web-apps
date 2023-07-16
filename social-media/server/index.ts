import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

import { authRoutes, userRoutes, postRoutes, uploadRoute } from "./routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/upload", uploadRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

mongoose
  .connect(process.env.CONNECTION_URL, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Database connected and Server Running on Port http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
