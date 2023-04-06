import { Request, Response } from "express";
import PostModel from "../models/postModel";

export const createPost = async (req: Request, res: Response) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json({ response: newPost });
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json({ response: post });
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};

export const getAllPostsByUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const posts = await PostModel.find({ userId: id });
    res.status(200).json({ response: posts });
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};