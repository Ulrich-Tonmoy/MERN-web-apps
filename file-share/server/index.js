import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import File from "./models/File.js";

const upload = multer({ dest: "uploads" });
const app = express();

app.use(cors());

app.post("/file/:id", async (req, res) => {
    const file = await File.findById(req.params.id);

    if (file.password != null) {
        res.status(400).json({
            err: "This file is password protected so give a password!",
        });
    }
    if (!(await bcrypt.compare(req.body.password, file.password))) {
        res.status(400).json({
            err: "Incorrect password!",
        });
    }

    file.downloadCount++;

    res.status(200).json({
        file: file.path,
        originalName: file.originalName,
    });
});

app.post("/upload", upload.single("file"), async (req, res) => {
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
    };

    if (req.body.password && req.body.password.length > 0) {
        fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create({ fileData });

    res.status(201).json({
        msg: "File uploaded successfully",
        id: file.id,
        name: file.originalName,
        filePath: `${req.headers.origin}/file/${file.id}`,
    });
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.log(`Database connected and Server Running on Port ${PORT}`))
    )
    .catch((error) => console.log(error.message));
