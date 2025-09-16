import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

function unauthorized(text: string = "Sem autorização") {
  return NextResponse.json({ message: text }, { status: 401 });
}

export async function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) return unauthorized();

  const user = await verifyToken(token);

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    if (!user) return unauthorized("Token inválido ou ausente");
    if (user.role !== "admin") return unauthorized("Apenas administradores");
  }

  if (pathname.startsWith("/api/cliente")) {
    if (!user) return unauthorized("Token inválido ou ausente");
    const id = pathname.split("/")[3];
    if (!id || user.id !== id) return unauthorized("Cliente inválido");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/api/cliente/:path*"],
};
