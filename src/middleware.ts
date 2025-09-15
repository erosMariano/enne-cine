// middleware.js or middleware.ts
import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jose.jwtVerify(token, secret);
  } catch (err) {
    return new Response("Invalid token", { status: 403 });
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/api/usuarios/:path*"],
};
