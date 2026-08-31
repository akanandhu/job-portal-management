import type { Request, Response } from "express";
import { loginUser } from "./auth.service";

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await loginUser(email, password);

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
}
