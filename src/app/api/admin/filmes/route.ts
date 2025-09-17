import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const filmes = await prisma.filme.findMany();
  return NextResponse.json(filmes);
}

export async function POST(request: NextResponse) {
  try {
    const { descricao, duracaoMin, titulo, postersUrl }: CreateFilmeDTO =
      await request.json();

    if (!descricao || !duracaoMin || !titulo) {
      return NextResponse.json(
        { message: "Dados incompletos para a criação do filme" },
        { status: 400 }
      );
    }

    const userHeader = request.headers.get("enne-user");

    if (!userHeader)
      return NextResponse.json({ message: "Sem autorização" }, { status: 401 });

    const user = JSON.parse(userHeader);

    if (!user)
      return NextResponse.json({ message: "Sem autorização" }, { status: 401 });

    const payload: CreateFilmeDTO = {
      usuarioId: user.id,
      titulo,
      descricao,
      duracaoMin,
      postersUrl: postersUrl || [],
    };

    const filme = await prisma.filme.create({
      data: {
        ...payload,
      },
    });
    if (!filme)
      return NextResponse.json(
        { message: "Erro ao criar filme" },
        { status: 500 }
      );

    return NextResponse.json(filme, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Erro ao criar filme" },
      { status: 500 }
    );
  }
}
