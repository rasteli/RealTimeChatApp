import React, { useState } from "react"
import { ListGroup, Modal } from "react-bootstrap"
import { useContact } from "../../contexts/ContactsProvider"
import CloseIcon from "../Modals/CloseIcon/CloseIcon"

const STYLES = {
  li: {
    backgroundColor: "rgb(31, 31, 31)",
    color: "#ddd",
    borderColor: "#ddda"
  }
}

export default function Contacts() {
  const { contacts } = useContact()
  const [open, setOpen] = useState(false)
  const [contactID, setContactID] = useState()
  const [contactName, setContactName] = useState()

  function onClick(name, id) {
    setContactName(name)
    setContactID(id)

    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  return (
    <>
      <ListGroup variant="flush">
        {contacts?.map(contact => (
          <ListGroup.Item
            action
            key={contact.id}
            style={STYLES.li}
            onClick={() => onClick(contact.name, contact.id)}
          >
            {contact.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header>
          <h5>{contactName}'s ID</h5>
          <CloseIcon closeModal={closeModal} />
        </Modal.Header>
        <Modal.Body>{contactID}</Modal.Body>
      </Modal>
    </>
  )
}
