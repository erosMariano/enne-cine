import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSecretKey } from "crypto";
import * as jose from "jose";

export async function POST(request: Request) {
  const { email, senha } = await request.json();

  if (!email || !senha) {
    return new Response("Incomplete data", { status: 400 });
  }
  const user = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const isPassword = await bcrypt.compare(senha, user.senha);

  if (!isPassword) {
    return new Response("password incorrect", { status: 401 });
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

  return new Response(JSON.stringify({ token }), { status: 200 });
}
