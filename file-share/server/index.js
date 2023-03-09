import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { getFile, handleDownload, uploadFile } from "./controller/file.js";

const upload = multer({ dest: "uploads" });
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.post("/file/upload", upload.single("file"), uploadFile);
app.route("/file/:id").get(getFile).post(handleDownload);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.log(`Database connected and Server Running on Port ${PORT}`))
    )
    .catch((error) => console.log(error.message));
