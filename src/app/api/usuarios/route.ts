import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Listar todos os usuários" });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "Criar um novo usuário" });
}
