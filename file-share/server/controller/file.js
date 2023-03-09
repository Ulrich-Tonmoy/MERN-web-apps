import File from "../models/File.js";
import bcrypt from "bcrypt";

export const uploadFile = async (req, res) => {
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
    };

    if (req.body.password && req.body.password.length > 0) {
        fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create({ ...fileData });

    res.status(201).json({
        msg: "File uploaded successfully",
        id: file._id,
        name: file.originalName,
        filePath: `${req.headers.origin}/file/${file._id}`,
    });
};

export const getFile = async (req, res) => {
    const file = await File.findById(req.params.id);

    if (file === null) {
        res.status(404).json({
            err: `No file found with id : ${req.params.id}`,
        });
    } else {
        if (file.password != null) {
            res.status(200).json({
                file: file.path,
                id: file._id,
                fileName: file.originalName,
                password: true,
            });
        } else {
            res.status(200).json({
                file: file.path,
                id: file._id,
                fileName: file.originalName,
            });
        }
    }
};

export const handleDownload = async (req, res) => {
    const file = await File.findById(req.params.id);

    if (file.password != null) {
        if (!(await bcrypt.compare(req.body.password, file.password))) {
            res.status(400).json({
                err: "Incorrect password!",
            });
        }
    }

    file.downloadCount++;
    await file.save();

    res.download(file.path, file.originalName);
};
