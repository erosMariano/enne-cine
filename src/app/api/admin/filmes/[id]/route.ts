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

export async function PUT(
  request: Request,
  { params }: { params: UpdateFilmeDTO }
) {
  try {
    const { id } = params;
    const { titulo, descricao, duracaoMin, postersUrl }: UpdateFilmeDTO =
      await request.json();

    const userHeaders = request.headers.get("enne-user");
    const user = userHeaders && JSON.parse(userHeaders);

    if (!userHeaders || !user)
      return NextResponse.json({ message: "Sem autorização" }, { status: 401 });

    if (!id) {
      return NextResponse.json(
        { message: "ID do filme não fornecido" },
        { status: 400 }
      );
    }

    const filme = await prisma.filme.update({
      where: { id },
      data: { titulo, descricao, duracaoMin, postersUrl, usuarioId: user.id },
    });

    if (!filme) {
      return NextResponse.json(
        { message: "Filme não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Filme atualizado com sucesso", filme },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Erro ao atualizar filme" },
      { status: 500 }
    );
  }
}
