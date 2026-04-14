import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";
import { User } from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function registerUser(data: any) {
  await connectToDatabase();

  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (existingUser) {
    throw new Error("User with this email or phone already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
}

export async function loginUser(data: any) {
  // 1. Check if login matches Admin credentials in .env.local
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword && data.email === adminEmail && data.password === adminPassword) {
    const adminUser = {
      _id: "admin_id",
      name: "System Admin",
      email: adminEmail,
      role: "admin",
    };

    const accessToken = generateAccessToken({ role: "admin", email: adminEmail });
    const refreshToken = generateRefreshToken({ role: "admin", email: adminEmail });

    return { user: adminUser, accessToken, refreshToken };
  }

  // 2. Normal User Login Flow
  await connectToDatabase();

  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password as string);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({ 
    userId: user._id.toString(), 
    role: "user" 
  });
  const refreshToken = generateRefreshToken({ 
    userId: user._id.toString(), 
    role: "user" 
  });

  const userObj = user.toObject();
  delete userObj.password;

  return { user: { ...userObj, role: "user" }, accessToken, refreshToken };
}

export async function getUserById(id: string) {
  await connectToDatabase();
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
