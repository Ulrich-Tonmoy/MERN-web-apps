import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";

import { getFile, handleDownload, uploadFile } from "./controller/file.js";

const upload = multer({ dest: "uploads" });
const app = express();

app.use(cors());

app.post("/file/upload", upload.single("file"), uploadFile);
app.route("/file/:id").get(getFile).post(handleDownload);
// app.get("/file/:id", getFile);
// app.post("/file/:id", handleDownload);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.log(`Database connected and Server Running on Port ${PORT}`))
    )
    .catch((error) => console.log(error.message));
