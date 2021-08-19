import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const STYLES = {
  headerIcon: { cursor: "pointer" }
}

export default function CloseIcon({ closeModal }) {
  return (
    <FontAwesomeIcon
      onClick={closeModal}
      icon={faTimes}
      style={STYLES.headerIcon}
    />
  )
}
