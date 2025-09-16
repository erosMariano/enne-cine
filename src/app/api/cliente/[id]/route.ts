import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  const userValidade = token ? await verifyToken(token) : null;


  if (!userValidade || userValidade.id !== id) {
    return NextResponse.json({ message: "Sem autorização" }, { status: 401 });
  }

  const user = await prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      active: true,
      avatarUrl: true,
      reservas: true,
    },
  });

  return NextResponse.json({ user });
}
