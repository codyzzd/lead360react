"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { sql } from "@vercel/postgres";
import { db } from "@vercel/postgres";

export function ModalNewAval() {
  const [ModalNewAval, setShow] = useState(false);
  const [NomeAvaliacao, setNomeAvaliacao] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const NewAvalSQL = async () => {
    const client = await db.connect();

    try {
      const result = await client.query(
        "INSERT INTO tests (id, name) VALUES (UUID(), $1)",
        [NomeAvaliacao]
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
      <Button onClick={() => setShow(true)} className="me-2">
        <span className="btn-label">
          <i className="fa fa-plus me-2"></i>
        </span>
        Criar Avaliação
      </Button>

      <Modal
        show={ModalNewAval}
        onHide={() => setShow(false)}
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
                value={NomeAvaliacao}
                onChange={(e) => setNomeAvaliacao(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={NewAvalSQL}>
            Criar Aavalição
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
