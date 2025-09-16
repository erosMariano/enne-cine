import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const users = await prisma.usuario.findMany();

  return NextResponse.json(users);
}
