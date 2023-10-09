/* --------------------------------- config --------------------------------- */
import { NextResponse } from "next/server";
/* --------------------------------- prisma --------------------------------- */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
/* ------------------------------- componentes ------------------------------ */
import { v4 } from "uuid";
import moment from "moment-timezone";

/* --------------------------------- funções -------------------------------- */
const convertToSaoPauloTime = (date: Date) => {
  // Cria um objeto moment a partir da data
  const momentDate = moment(date);

  // Converte a data para o fuso horário de São Paulo Brasil
  const saoPauloDate = momentDate.tz("America/Sao_Paulo");

  // Retorna a data no fuso horário de São Paulo Brasil
  return saoPauloDate;
};

/* -------------------------------------------------------------------------- */
/*                                listar todos                                */
/* -------------------------------------------------------------------------- */
export async function GET(request: Request) {
  const surveys = await prisma.surveys.findMany({
    orderBy: {
      created: "desc",
    },
  });

// Converte as datas dos registros de pesquisa para o fuso horário de São Paulo Brasil
surveys.forEach((survey) => {
  // Converte o objeto Date para um objeto Moment
  const momentCreated = moment(survey.created);

  // Converte a data para o fuso horário de São Paulo Brasil
  survey.created = momentCreated.tz("America/Sao_Paulo").toDate();
});

  try {
    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

/* -------------------------------------------------------------------------- */
/*                                  cadastrar                                 */
/* -------------------------------------------------------------------------- */
export async function POST(request: Request) {
  try {
    // Gera um ID usando a função uuidv4()
    const id = v4();

    // Obter a data e hora do servidor no fuso horário UTC
    const utcCreated = moment().tz("UTC");

    // Converte o objeto moment para um objeto Date
    const created = utcCreated.toDate();

    const requestBody = await request.json();
    const { name, about, id_user } = requestBody;

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
