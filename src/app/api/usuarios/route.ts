import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { verifyToken } from "@/lib/auth";
export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  const user = await verifyToken(token);

  if (!user || user.role !== "admin") {
    console.log(user);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.usuario.findMany();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { email, nome, senha, avatarUrl }: Usuario = await request.json();

  if (!email || !nome || !senha) {
    return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
  }

  const userExists = await prisma.usuario.findUnique({
    where: { email },
  });

  if (userExists) {
    return NextResponse.json({ message: "Usuário já existe" }, { status: 400 });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(senha, saltRounds);

  const newUser = await prisma.usuario.create({
    data: {
      email,
      nome,
      senha: hashedPassword,
      avatarUrl,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
