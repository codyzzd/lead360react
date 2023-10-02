/* -------------------------------- metadata -------------------------------- */
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Avaliações",
};

/* ------------------------------- components ------------------------------- */
import { ModalNewAval } from "@/app/comps/ModalNewAval";
import Link from "next/link";
import Button from "react-bootstrap/Button";

/* --------------------------------- kysely --------------------------------- */
import { createKysely } from "@vercel/postgres-kysely";
const connectionString = process.env.POSTGRES_URL;
export interface Database {
  tests: tests;
}
interface tests {
  id: string;
  name: string;
}
const db = createKysely<Database>({
  connectionString: connectionString,
});

/* ---------------------------- query no banco --------------------------- */
async function selectAllFromTests() {
  try {
    const result = await db.selectFrom("tests").selectAll().execute();
    return result;
  } catch (error) {
    console.error('Error fetching data from "tests":', error);
    throw new Error("Error fetching data from tests");
  }
}

/* ---------------------------- renderizar pagina --------------------------- */
export default async function AvaliacoesPage() {
  let tests:any[] = [];

  //fazer consulta no banco
  try {
    tests = await selectAllFromTests();
    console.log("Tests successfully fetched:", tests);
  } catch (error) {
    console.error("Something went wrong:", error);
  }

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
              <ModalNewAval />
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
            {tests.map((test) => (
              <tr key={test.id}>
                <td className="align-middle">{test.name}</td>
                <td className="text-end">
                  <Link
                    href={`/avaliacao/${test.id}`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Entrar
                  </Link>

                  <button
                    type="button"
                    className="btn btn-sm btn-light part_del"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_excluir"
                    data-aval-id={test.id}
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
