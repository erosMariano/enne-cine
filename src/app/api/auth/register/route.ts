import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
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
