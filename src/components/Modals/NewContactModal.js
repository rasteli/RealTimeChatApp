import React, { useRef } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import CloseIcon from "./CloseIcon/CloseIcon"
import { useContact } from "../../contexts/ContactsProvider"

export default function NewContactModal({ closeModal }) {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContact()

  function handleSubmit(e) {
    e.preventDefault()

    const id = idRef.current.value
    const name = nameRef.current.value

    createContact(id, name)
    closeModal()
  }

  return (
    <>
      <Modal.Header>
        New Contact
        <CloseIcon closeModal={closeModal} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit" className="mt-3">
            Add Contact
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}
