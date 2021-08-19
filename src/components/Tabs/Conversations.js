import React from "react"
import { ListGroup } from "react-bootstrap"
import { useConversation } from "../../contexts/ConversationsProvider"

const STYLES = {
  li: {
    backgroundColor: "rgb(31, 31, 31)",
    color: "#ddd",
    borderColor: "#ddda"
  },
  liActive: {
    backgroundColor: "#0d6efd",
    color: "#fff"
  }
}

export default function Conversation() {
  const { conversations, selectConversationIndex } = useConversation()

  return (
    <ListGroup variant="flush">
      {conversations?.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          active={conversation.selected}
          style={conversation.selected ? STYLES.liActive : STYLES.li}
          onClick={() => selectConversationIndex(index)}
        >
          {conversation.recipients.map(recipient => recipient.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
