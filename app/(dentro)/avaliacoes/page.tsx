/* -------------------------------- metadata -------------------------------- */
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Avaliações",
};

/* ------------------------------- components ------------------------------- */
import { ModalNewSurvey } from "@/app/comps/modal_new_survey";
import { ModalDelSurvey } from "@/app/comps/modal_del_survey";
//import { TableSurveys } from "@/app/comps/table_surveys";

import { Surveys, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Surveys[]> {
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

/* ---------------------------- renderizar pagina --------------------------- */
export default async function SurveysPage() {
  const data: any[] = await getData();

  return (
    <>
      <div className="container mt-4">
        <div className="mt-8 mb-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-auto md:grow mb-4 md:mb-0">
              <h1 className="text-3xl font-semibold tracking-tight mb-1">
                Avaliações
              </h1>
              <p className=" max-w-2xl text-sm leading-6 text-gray-500">
                Crie avaliações e seus grupos de participantes.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <ModalNewSurvey />
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
