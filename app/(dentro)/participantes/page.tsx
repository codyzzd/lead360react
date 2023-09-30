import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import { Metadata } from "next";
import Counter from "@/app/comps/modal_new_aval";

export const metadata: Metadata = {
  title: "Participantes",
};

export default async function ParticipantesPage() {
  return (
    <div className="container mt-4">
      {/* Título e Subtítulo com botão Adicionar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>Participantes</h2>
          <p>Prepare os participantes para as avaliações</p>
        </div>
        <Button variant="primary" onClick={handleShow}>
          Criar Avaliação
        </Button>
      </div>
      {/* Tabela com 2 colunas */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dado 1</td>
            <td>Dado 2</td>
            <td>Dado 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
