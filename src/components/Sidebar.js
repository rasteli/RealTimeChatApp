import React, { useState } from "react"
import { Tab, Nav, Button, Modal, Navbar } from "react-bootstrap"

import Contacts from "./Tabs/Contacts"
import Conversations from "./Tabs/Conversations"
import NewContactModal from "./Modals/NewContactModal"
import NewConversationModal from "./Modals/NewConversationModal"
import { useConversation } from "../contexts/ConversationsProvider"

const STYLES = {
  div: { width: "225px" },
  borderRight: { borderRight: "1px solid rgba(0, 0, 0, 0.15)" },
  noRadius: { borderRadius: "0" }
}

const KEYS = {
  contacts: "contacts",
  conversations: "conversations"
}

export default function Sidebar({ id }) {
  const [open, setOpen] = useState(false)
  const [activeKey, setActiveKey] = useState(KEYS.conversations)
  const { display } = useConversation()

  const conversationOpen = activeKey === KEYS.conversations

  function closeModal() {
    setOpen(false)
  }

  return (
    <div style={STYLES.div} className={`${display} flex-column`}>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="pills" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={KEYS.conversations} style={STYLES.noRadius}>
              Conversations
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={KEYS.contacts} style={STYLES.noRadius}>
              Contacts
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content
          className="overflow-auto flex-grow-1"
          style={STYLES.borderRight}
        >
          <Tab.Pane eventKey={KEYS.conversations}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={KEYS.contacts}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div
          className="p-2 border-top small text-white"
          style={STYLES.borderRight}
        >
          Your ID: <span className="text-muted">{id}</span>
        </div>
        <Button onClick={() => setOpen(true)} className="rounded-0">
          New {conversationOpen ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>
      <Modal show={open} onHide={closeModal}>
        {conversationOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  )
}
