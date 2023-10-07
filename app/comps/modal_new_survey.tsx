"use client";
import { useState } from "react";
import { v4 } from "uuid";
import { FormEvent } from "react";

/* ------------------------------- components ------------------------------- */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";

/* -------------------------- renderizar componente ------------------------- */
export function ModalNewSurvey() {
  const router = useRouter();

  const [modalNewAval, setModalNewAval] = useState(false);
  const [nomeAvaliacao, setNomeAvaliacao] = useState("");

  const handleShow = () => setModalNewAval(true);

  const handleClose = () => {
    setNomeAvaliacao(""); // Clear the input field
    setModalNewAval(false);
  };

  // adicionar survey
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // nao submita o form
    const formData = new FormData(event.currentTarget); // pega os dados
    handleClose(); // fecha o modal

    // Gera um ID usando a função uuidv4()
    const id = v4();

    // Adiciona o ID ao formulário
    formData.append("id", id);

    // Converte os dados em JSON
    const data = JSON.stringify({
      id: formData.get("id"),
      name: formData.get("name"),
    });
    //console.log(data);

    const APIURL = process.env.API_URL; // pega url
    const response = await fetch(`/api/surveys`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.refresh();

    //console.log(formData);

    // Handle response if necessary
    //const data = await response.json();
    // ...
  }

  return (
    <>
      <Button onClick={handleShow} className="me-2">
        <span className="btn-label">
          <i className="fa fa-plus me-2"></i>
        </span>
        Criar Avaliação
      </Button>

      <Modal
        show={modalNewAval}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Criar Avaliação
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="NomeAvaliacao">
              <Form.Label>Nome da Avaliação</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Setor Administrativo 1"
                value={nomeAvaliacao}
                name="name"
                onChange={(e) => setNomeAvaliacao(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Criar Avaliação</Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </>
  );
}
