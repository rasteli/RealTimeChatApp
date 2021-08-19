import React, { useContext, useState, useEffect, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useContact } from "./ContactsProvider"
import { useSocket } from "./SocketProvider"

const ConversationsContext = React.createContext()

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false

  arr1.sort()
  arr2.sort()

  return arr1.every((element, index) => {
    return element === arr2[index]
  })
}

export function useConversation() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage("conversations", [])
  const [selectConversationIndex, setSelectConversationIndex] = useState(0)
  const [display, setDisplay] = useState("d-flex")

  const { contacts } = useContact()
  const socket = useSocket()

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations(prevConversations => {
        let madeChange = false
        const newMessage = { sender, text }

        const newConversations = prevConversations.map(conversation => {
          if (arraysAreEqual(conversation.recipients, recipients)) {
            madeChange = true
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage]
            }
          }

          return conversation
        })

        if (madeChange) {
          return newConversations
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }]
        }
      })
    },
    [setConversations]
  )

  useEffect(() => {
    if (!socket) return

    socket.on("receive-message", addMessageToConversation)

    return () => socket.off("receive-message")
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text })

    addMessageToConversation({ recipients, text, sender: id })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })

      const name = (contact && contact.name) || recipient // id
      return { id: recipient, name }
    })

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })

      const name = (contact && contact.name) || message.sender // id
      const fromMe = id === message.sender

      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectConversationIndex
    return { ...conversation, messages, recipients, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectConversationIndex: setSelectConversationIndex,
    selectedConversation: formattedConversations[selectConversationIndex],
    createConversation,
    sendMessage,
    setDisplay,
    display
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
