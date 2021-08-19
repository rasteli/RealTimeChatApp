import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useContact } from "../../contexts/ContactsProvider"
import { useConversation } from "../../contexts/ConversationsProvider"

import CloseIcon from "./CloseIcon/CloseIcon"

export default function NewConversationModal({ closeModal }) {
  const { contacts } = useContact()
  const { createConversation } = useConversation()
  const [selectedContactIds, setSelectedContactIds] = useState([])

  function handleSubmit(e) {
    e.preventDefault()

    createConversation(selectedContactIds)
    closeModal()
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds(prevSelectedIds => {
      if (prevSelectedIds.includes(contactId)) {
        return prevSelectedIds.filter(prevId => {
          return prevId !== contactId // remove id if it's already in the list
        })
      } else {
        return [...prevSelectedIds, contactId] // add id to the list
      }
    })
  }

  return (
    <>
      <Modal.Header>
        New Conversation
        <CloseIcon closeModal={closeModal} />
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-3">Your contacts</h5>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button
            type="submit"
            className="mt-4"
            disabled={!(selectedContactIds.length >= 1)}
          >
            Start a chat
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}
