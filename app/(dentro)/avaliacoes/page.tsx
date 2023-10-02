import { ModalNewAval } from "@/app/comps/ModalNewAval";

import { db } from "@vercel/postgres";
import { Metadata } from "next";
import Link from "next/link";

import Button from "react-bootstrap/Button";

//define o nome da pagina
export const metadata: Metadata = {
  title: "Avaliações",
};

// busca os testes no banco
async function consulta_tests() {
  const client = await db.connect();

  try {
    const result = await client.query("SELECT * FROM tests");

    console.log("Select successfully:", result.rows);
    return result.rows;
  } finally {
    client.release();
  }
}

//renderiza a pagina
export default async function AvaliacoesPage() {
  const tests = await consulta_tests(); // pega os dados da consulta anterior

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
            {tests.map((tests) => (
              <tr key={tests.id}>
                <td className="align-middle">{tests.name}</td>
                <td className="text-end">
                  <Link
                    href={`/avaliacao/${tests.id}`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Entrar
                  </Link>

                  <button
                    type="button"
                    className="btn btn-sm btn-light part_del"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_excluir"
                    data-aval-id={tests.id}
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
