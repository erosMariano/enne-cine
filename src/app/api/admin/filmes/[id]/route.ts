import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: DeleteFilmeDTO }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do filme não fornecido" },
        { status: 400 }
      );
    }

    const filme = await prisma.filme.delete({
      where: { id },
    });

    if (!filme) {
      return NextResponse.json(
        { message: "Filme não encontrado ou já removido" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Filme removido com sucesso", filme },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Erro ao remover filme" },
      { status: 500 }
    );
  }
}
