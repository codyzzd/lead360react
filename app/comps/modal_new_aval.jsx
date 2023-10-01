"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function BasicModal() {
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Criar avaliação</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Criar avaliação</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
}
