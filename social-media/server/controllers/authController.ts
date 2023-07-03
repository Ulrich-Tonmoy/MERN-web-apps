import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import { createJWT } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, password, email, fullName } = req.body;

  const emailAlreadyExists = await UserModel.findOne({ email });
  if (emailAlreadyExists) {
    return res.status(400).json("Email already exists");
  }
  const usernameAlreadyExists = await UserModel.findOne({ username });
  if (usernameAlreadyExists) {
    return res.status(400).json("UserName already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new UserModel({ username, password: hashedPassword, email, fullName });

  try {
    const user = await newUser.save();
    const token = createJWT({ username: user.username, email: user.email, id: user._id });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let user;
    if (!user && username) {
      user = await UserModel.findOne({ username: username });
    }
    if (!user && username) {
      user = await UserModel.findOne({ email: username });
    }

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) res.status(400).json("Wrong Password");

      const token = createJWT({ username: user.username, email: user.email, id: user._id });
      res.status(200).json({ token, user });
    } else {
      res.status(404).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
