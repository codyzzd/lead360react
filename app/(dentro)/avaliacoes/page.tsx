/* -------------------------------- metadata -------------------------------- */
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Avaliações",
};

/* ------------------------------- components ------------------------------- */
import { ModalNewSurvey } from "@/app/comps/modal_new_survey";
import { ModalDelSurvey } from "@/app/comps/modal_del_survey";
import { TableSurveys } from "@/app/comps/table_surveys";

/* ---------------------------- renderizar pagina --------------------------- */
export default function SurveysPage() {
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
              <ModalNewSurvey />
            </div>
          </div>
        </div>
        <TableSurveys />
      
      </div>
    </>
  );
}
