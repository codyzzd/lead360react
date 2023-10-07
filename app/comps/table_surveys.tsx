//"use client";
//import { useState } from "react";
import Link from "next/link";
import { ModalDelSurvey } from "@/app/comps/modal_del_survey";

/* ------------------------------ Buscar dados ------------------------------ */
async function getSurveys() {
  const APIURL = process.env.API_URL;
  const res = await fetch(`${APIURL}/api/surveys`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}


export async function TableSurveys() {
  const surveysData: any[] = await getSurveys();
  const surveys = Array.from(surveysData);

  return (
    <>
      <table className="table table-hover">
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
    </>
  );
}
