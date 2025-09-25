import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const sessoes = await prisma.sessao.findMany({
    include: { filme: true },
    orderBy: { data: "asc" },
  });

  return NextResponse.json(sessoes);
}
export async function POST(request: NextRequest) {
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
