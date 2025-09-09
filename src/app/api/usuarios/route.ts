import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const users = await prisma.usuario.findMany();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "Criar um novo usuário" });
}
