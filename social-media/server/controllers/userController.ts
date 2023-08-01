import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/jwt";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    let users: any = await UserModel.find();
    users = users.map((user) => {
      const { password, ...other } = user._doc;
      return other;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    let user;
    if (!user) {
      user = await UserModel.findOne({ username: id });
    }
    if (!user) {
      user = await UserModel.findById(id);
    }

    console.log(user);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { password, username } = req.body;

  const usernameAlreadyExists = await UserModel.findOne({ username });
  if (username !== usernameAlreadyExists.username) {
    return res.status(400).json("UserName already exists");
  }

  if (await UserModel.findById(id)) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = createJWT({ username: user.username, email: user.email, id: user._id });

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (await UserModel.findById(id)) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

export const followUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { userId } = req.body;

  if (userId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(userId);

      if (!followUser.followers.includes(userId)) {
        await followUser.updateOne({ $push: { followers: userId } });
        await followingUser.updateOne({ $push: { followings: id } });
        res.status(200).json("Following!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

export const unFollowUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { userId } = req.body;

  if (userId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(userId);

      if (followUser.followers.includes(userId)) {
        await followUser.updateOne({ $pull: { followers: userId } });
        await followingUser.updateOne({ $pull: { followings: id } });
        res.status(200).json("UnFollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
