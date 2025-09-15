import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  const user = await verifyToken(token);

  if (!user || user.role !== "admin") {
    console.log(user);
    return NextResponse.json({ message: "Sem permissão" }, { status: 401 });
  }

  const users = await prisma.usuario.findMany();

  return NextResponse.json(users);
}
