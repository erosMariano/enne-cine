import { requireAdmin } from "@/lib/auth";
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
  context: { params: { id: string } }
) {
  const { params } = context;
  const idUser = params.id;

  return NextResponse.json({
    message: `Deletar o usuário com ID: ${idUser}`,
  });
}
