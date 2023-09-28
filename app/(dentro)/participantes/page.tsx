export default function ParticipantesPage() {
  return (
    <div className="container mt-4">
      {/* Título e Subtítulo com botão Adicionar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>Participantes</h2>
          <p>Prepare os participantes para as avaliações</p>
        </div>
        <button className="btn btn-primary">
          <span className="btn-label">
            <i className="fa fa-plus me-2"></i>
          </span>
          Adicionar
        </button>
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
