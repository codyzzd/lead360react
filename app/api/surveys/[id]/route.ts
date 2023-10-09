/* --------------------------------- config --------------------------------- */
import { NextResponse, NextRequest } from "next/server";
/* --------------------------------- prisma --------------------------------- */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/* -------------------------------------------------------------------------- */
/*                              acessar registro                              */
/* -------------------------------------------------------------------------- */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const survey = await prisma.surveys.findUnique({
      where: {
        id,
      },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found." }, { status: 404 });
    } else {
      return NextResponse.json(survey, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json(
      { error: "Error fetching survey." },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                              deletar registro                              */
/* -------------------------------------------------------------------------- */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const survey = await prisma.surveys.findUnique({
      where: {
        id,
      },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found." }, { status: 404 });
    } else {
      await prisma.surveys.delete({ where: { id } });
      return NextResponse.json(
        { message: "Survey deleted successfully." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error deleting survey:", error);
    return NextResponse.json(
      { error: "Error deleting survey." },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                             atualizar registro                             */
/* -------------------------------------------------------------------------- */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const survey = await prisma.surveys.findUnique({
      where: {
        id,
      },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found." }, { status: 404 });
    } else {
      const requestBody = await request.json();

      const updatedSurvey = {
        ...survey,
        ...requestBody,
      };

      await prisma.surveys.update({
        where: {
          id,
        },
        data: updatedSurvey,
      });

      return NextResponse.json(
        { message: "Survey updated successfully." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error updating survey:", error);
    return NextResponse.json(
      { error: "Error updating survey." },
      { status: 500 }
    );
  }
}
