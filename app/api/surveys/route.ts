import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Listar todos
export async function GET(request: Request) {
  const surveys = await prisma.surveys.findMany();

  try {
    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Cadastrar
export async function POST(request: Request) {
  try {
    const requestBody = await request.json();

    const { id, name, about, id_user, created } = requestBody;

    // Crie um novo registro no banco de dados usando os dados fornecidos
    const createdRecord = await prisma.surveys.create({
      data: {
        id,
        name,
        about,
        id_user,
        created,
      },
    });

    return NextResponse.json({ record: createdRecord }, { status: 201 });
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { error: "Error creating record." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Certifique-se de desconectar o Prisma após a operação
  }
}
