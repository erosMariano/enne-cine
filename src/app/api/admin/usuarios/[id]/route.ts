import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  const idUser = params.id;
  return NextResponse.json({
    message: `Obter detalhes do usuário com ID: ${idUser}`,
  });
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const validateUser = await requireAdmin(request);

  if (validateUser.status !== 200) return validateUser;

  const { params } = context;
  const idUser = params.id;
  return NextResponse.json({
    message: `Atualizar o usuário com ID: ${idUser}`,
  });
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
