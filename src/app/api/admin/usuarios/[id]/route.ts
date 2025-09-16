import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id)
    return NextResponse.json(
      { message: "ID do usuário é obrigatório" },
      { status: 400 }
    );
  try {
    const user = await prisma.usuario.findUnique({
      where: { id },
      include: { reservas: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const data = await request.json();
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { message: "ID do usuário é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const updateUser = await prisma.usuario.update({
      where: { id },
      data: {
        ...data,
      },
    });

    if (!updateUser) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usuário atualizado com sucesso", user: updateUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { message: "ID do usuário é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const deleteUser = await prisma.usuario.delete({
      where: { id },
    });

    if (!deleteUser) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usuário deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}
