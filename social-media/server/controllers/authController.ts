import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  const { username, password, email, fullName } = req.body;

  const emailAlreadyExists = await UserModel.findOne({ email });
  if (emailAlreadyExists) {
    res.status(400).json({ message: "Email already exists" });
  }
  const usernameAlreadyExists = await UserModel.findOne({ username });
  if (usernameAlreadyExists) {
    res.status(400).json({ message: "UserName already exists" });
  }

  const newUser = new UserModel({ username, password, email, fullName });

  try {
    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
