import { Request,Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from "../model/User";



export const register = async (req:Request, res:Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  await User.create({
    username,
    email,
    password:hashedPassword,
  });
  
  res.json({message:"Registered successfully"})

}


export const login = async (req:Request, res:Response) => {
  const {email, password} = req.body;

  const user = await User.findOne({email})
   if (!user) return res.status(400).json({ message: "Invalid credentials" });


  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });


  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

   res.json({
    token,
    role: user.role,
  });

}