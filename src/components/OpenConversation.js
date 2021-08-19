import React, { useState, useCallback } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faBars } from "@fortawesome/free-solid-svg-icons"
import { useConversation } from "../contexts/ConversationsProvider"

const STYLES = {
  messageInput: {
    height: "50px",
    resize: "none",
    borderRadius: "0",
    background: "none",
    borderColor: "#0d6efd",
    color: "#ddd"
  },
  button: { borderRadius: "0 5px 5px 0" },
  bars: { borderRadius: "5px 0 0 5px" }
}

export default function OpenConversation() {
  const [text, setText] = useState("")
  const [dNone, setDNone] = useState(false)
  const lastMessageRef = useCallback(node => {
    if (node) node.scrollIntoView({ smooth: true })
  }, [])

  const { sendMessage, selectedConversation, setDisplay } = useConversation()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(recipient => recipient.id),
      text
    )

    setText("")
  }

  function displayToggle() {
    setDisplay(dNone ? "d-flex" : "d-none")
    setDNone(!dNone)
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index

            return (
              <div
                ref={lastMessage ? lastMessageRef : null}
                key={index}
                className={`my-2 d-flex flex-column align-items-${
                  message.fromMe ? "end" : "start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 text-white ${
                    message.fromMe ? "bg-primary" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe && "text-right"
                  }`}
                >
                  {!message.fromMe && message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Button
              variant="outline-primary"
              style={STYLES.bars}
              onClick={displayToggle}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
            <Form.Control
              as="textarea"
              placeholder="Type a message..."
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={STYLES.messageInput}
            />
            <InputGroup.Append>
              <Button
                type="submit"
                variant="outline-primary"
                className="h-100"
                style={STYLES.button}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
