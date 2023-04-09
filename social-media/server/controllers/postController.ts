import { Request, Response } from "express";
import PostModel from "../models/postModel";
import mongoose from "mongoose";
import UserModel from "../models/userModel";

export const createPost = async (req: Request, res: Response) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json({ response: newPost });
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const post = await PostModel.find();
    res.status(200).json({ response: post });
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

export const getPostsByUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const posts = await PostModel.find({ userId: id });
    res.status(200).json({ response: posts });
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ response: post });
    } else {
      res.status(403).json({ response: "Action forbidden" });
    }
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json({ response: "Post deleted successfully" });
    } else {
      res.status(403).json({ response: "Action forbidden" });
    }
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};

export const likePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ response: "Post liked" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ response: "Post UnLiked" });
    }
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};

export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingUsersPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "followings",
          foreignField: "userId",
          as: "followingUsersPosts",
        },
      },
      {
        $project: {
          followingUsersPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      response: currentUserPosts
        .concat(...followingUsersPosts[0].followingUsersPosts)
        .sort((a: any, b: any) => {
          return b.createdAt - a.createdAt;
        }),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
