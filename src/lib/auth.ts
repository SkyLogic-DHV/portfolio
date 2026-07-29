import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "skylogic-secret-key-2026-production-ready";

export const COOKIE_NAME = "skylogic_token";

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
  name?: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/** Alias for `generateToken` used by the password-based login route. */
export function signToken(payload: Partial<JwtPayload> & { userId: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("skylogic_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
