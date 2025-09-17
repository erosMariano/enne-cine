import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { filmeId, data, horario, sala, assentosTotais }: CreateSessaoDTO =
    await request.json();

  if (!filmeId || !data || !horario || !sala || !assentosTotais) {
    return NextResponse.json(
      { message: "Envie todos os campos necessários para criar sessão." },
      { status: 400 }
    );
  }

  const filme = await prisma.filme.findUnique({
    where: { id: filmeId },
  });

  if (!filme) {
    return NextResponse.json(
      { message: "Filme não encontrado." },
      { status: 404 }
    );
  }

  const novaSessao = await prisma.sessao.create({
    data: {
      filmeId,
      data: formatDate(data),
      horario,
      sala,
      assentosTotais,
      assentosDisponiveis: assentosTotais,
    },
  });

  if (!novaSessao) {
    return NextResponse.json(
      { message: "Erro ao criar sessão." },
      { status: 500 }
    );
  }

  return NextResponse.json(novaSessao, { status: 201 });
}
