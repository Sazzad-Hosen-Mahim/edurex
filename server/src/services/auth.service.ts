import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function register(
  email: string,
  password: string,
  role: "admin" | "user" = "user"
) {
  const user = await User.create({ email, password, role });
  return { id: user._id, email: user.email, role: user.role };
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user || !(await user.compare(password)))
    throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    subject: String(user._id),
    expiresIn: "7d",
  });

  return { token, user: { id: user._id, email: user.email, role: user.role } };
}
