import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "livion-interiors-secret-change-this-in-production"
);

const COOKIE_NAME = "livion_admin_token";
const TOKEN_EXPIRY = "24h";

// ─── JWT ──────────────────────────────────────────────────────────
export async function signToken(payload: { id: string; username: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; username: string };
  } catch {
    return null;
  }
}

// ─── Password ─────────────────────────────────────────────────────
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export { COOKIE_NAME };
