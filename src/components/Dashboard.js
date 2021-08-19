import React from "react"
import Sidebar from "./Sidebar"
import OpenConversation from "./OpenConversation"
import { useConversation } from "../contexts/ConversationsProvider"

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversation()

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
