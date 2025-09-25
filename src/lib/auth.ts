import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function verifyToken(
  token: string
): Promise<jose.JWTPayload | null> {
  try {
    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jose.jwtVerify(token, secret);

    return payload;
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return null;
  }
}

export async function requireAdmin(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  const user = await verifyToken(token);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Sem permissão" }, { status: 403 });
  }
  return NextResponse.json({ user }, { status: 200 });
}
