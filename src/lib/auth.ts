import * as jose from "jose";

export async function verifyToken(token: string) {
  try {
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.log("Invalid token", err);
    return null;
  }
}
