/* -------------------------------- metadata -------------------------------- */
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Avaliações",
};

/* ------------------------------- components ------------------------------- */
import { ModalNewAval } from "@/app/comps/ModalNewAval";
import Link from "next/link";
import Button from "react-bootstrap/Button";

/* --------------------------------- prisma --------------------------------- */
/*
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// função que busca no banco
async function getAllSurveys() {
  try {
    const surveys = await prisma.surveys.findMany();
    return surveys;
  } catch (error) {
    console.error('Error fetching data from "surveys":', error);
    throw new Error("Error fetching data from surveys");
  }
}

// Ato de buscar os dados
let surveys: any[] = []; //zera variavel
async function fetchAllSurveys() {
  try {
    const allSurveys = await getAllSurveys();
    surveys = allSurveys; // preenche variavel
    console.log("All surveys:", allSurveys);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}
*/
async function getSurveys() {
  const apiUrl = process.env.API_URL;
  const res = await fetch(`${apiUrl}/api/surveys`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
/* ---------------------------- renderizar pagina --------------------------- */
export default async function AvaliacoesPage() {
  //await fetchAllSurveys(); //buscar dados do banco
  const surveysData: any[] = await getSurveys();
  const surveys = Array.from(surveysData);

  return (
    <>
      <div className="container mt-4">
        <div className="container mt-3 mt-sm-5 mb-3">
          <div className="row ">
            <div className="col-md">
              <h2>Avaliações</h2>
              <p>Crie avaliações e seus grupos de participantes.</p>
            </div>
            <div className="col-md-auto text-md-end text-end d-grid gap-2 d-md-block">
              {/*<ModalNewAval />*/}
            </div>
          </div>
        </div>

        {/* Tabela com 2 colunas */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey.id}>
                <td className="align-middle">{survey.name}</td>
                <td className="text-end">
                  <Link
                    href={`/avaliacao/${survey.id}`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Entrar
                  </Link>

                  <button
                    type="button"
                    className="btn btn-sm btn-light part_del"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_excluir"
                    data-aval-id={survey.id}
                  >
                    <span className="btn-label">
                      <i className="fa fa-trash"></i>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
