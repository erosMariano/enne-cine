import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSecretKey } from "crypto";
import * as jose from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, senha } = await request.json();

  if (!email || !senha) {
    return NextResponse.json({ message: "Incomplete data" }, { status: 400 });
  }
  const user = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isPassword = await bcrypt.compare(senha, user.senha);

  if (!isPassword) {
    return NextResponse.json({ message: "password incorrect" }, { status: 401 });
  }

  const secretKey = createSecretKey(process.env.JWT_SECRET!, "utf-8");
  const token = await new jose.SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(secretKey);

  return NextResponse.json({ token }, { status: 200 });
}
