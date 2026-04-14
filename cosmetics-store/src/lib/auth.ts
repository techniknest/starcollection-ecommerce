import jwt from "jsonwebtoken";
import * as jose from "jose";


export interface TokenPayload {
  userId?: string;
  role: "user" | "admin";
  email?: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(payload: TokenPayload): string {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string, type: "access" | "refresh") {
  const secret =
    type === "access"
      ? process.env.JWT_ACCESS_SECRET
      : process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT secret missing");
  return jwt.verify(token, secret) as unknown as TokenPayload;
}

export async function verifyTokenEdge(token: string, type: "access" | "refresh") {
  const secretStr =
    type === "access"
      ? process.env.JWT_ACCESS_SECRET
      : process.env.JWT_REFRESH_SECRET;
  if (!secretStr) throw new Error("JWT secret missing");

  const secret = new TextEncoder().encode(secretStr);
  const { payload } = await jose.jwtVerify(token, secret);
  return payload as unknown as TokenPayload;
}
