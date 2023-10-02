"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export function ModalNewAval() {
  const [ModalNewAval, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome da Avaliação</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Setor Administrativo 1"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Criar Avaliacão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
