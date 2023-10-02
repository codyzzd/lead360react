'use client'
import { v4 as uuidv4 } from "uuid";
import { db } from "@vercel/postgres";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export function ModalNewAval() {
  const [modalNewAval, setModalNewAval] = useState(false);
  const [nomeAvaliacao, setNomeAvaliacao] = useState("");

  const handleClose = () => setModalNewAval(false);
  const handleShow = () => setModalNewAval(true);

  const newAvalSQL = async () => {
    const client = await db.connect();

    try {
      const uuid = uuidv4();
      const result = await client.query(
        "INSERT INTO tests (id, name) VALUES ($1, $2)",
        [uuid, nomeAvaliacao]
      );

      console.log("Inserted successfully:", result.rows);
    } catch (error) {
      console.error("Error inserting into the database:", error);
    } finally {
      client.release();
    }

    handleClose(); // Close the modal after insertion
  };

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
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="NomeAvaliacao">
              <Form.Label>Nome da Avaliação</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Setor Administrativo 1"
                value={nomeAvaliacao}
                onChange={(e) => setNomeAvaliacao(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={newAvalSQL}>
            Criar Avaliação
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
