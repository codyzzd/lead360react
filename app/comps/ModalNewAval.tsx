"use client";
import { useState } from "react";

/* ------------------------------- components ------------------------------- */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

/* --------------------------------- kysely --------------------------------- */

import { createKysely } from "@vercel/postgres-kysely";
<<<<<<< HEAD
const connectionString = process.env.POSTGRES_URL;
interface Database {
  tests: tests;
=======
const connectionString =
  "postgres://default:1KhETrtkvln8@ep-calm-moon-28561890-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb";
interface Database {
  tests: Tests;
}
interface Tests {
  id: string;
  name: string;
>>>>>>> 3e8e709 (test)
}
const db = createKysely<Database>({
  connectionString: connectionString,
});

/* ---------------------------- query no banco --------------------------- */
async function insertIntoDatabase() {
  try {
    const result = await db
      .insertInto("tests")
      .values({ id: "12321321312", name: "testx" })
      .executeTakeFirst();
    return result;
  } catch (error) {
    console.error('Error fetching data from "tests":', error);
    throw new Error("Error fetching data from tests");
  }
}

/* -------------------------- renderizar componente ------------------------- */
export function ModalNewAval() {
  const [modalNewAval, setModalNewAval] = useState(false);
  const [nomeAvaliacao, setNomeAvaliacao] = useState("");

  const handleShow = () => setModalNewAval(true);

  const handleClose = () => {
    setNomeAvaliacao(""); // Clear the input field
    setModalNewAval(false);
  };

  const handleCreateAvaliacao = async () => {
    try {
      await insertIntoDatabase(); // Insert into the database

      // Close the modal and clear the input field
      handleClose();
    } catch (error) {
      console.error("Error creating Avaliacao:", error);
    }
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
          <Button variant="primary" onClick={handleCreateAvaliacao}>
            Criar Avaliação
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
