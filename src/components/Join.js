import React, { useRef } from "react"
import { Form, Button } from "react-bootstrap"
import { v4 as uuidV4 } from "uuid"

import CenteredContainer from "./CenteredContainer"

const STYLES = {
  h1: { color: "#fff", borderBottom: "2px solid #fff" },
  formControl: { borderRadius: "0" }
}

export default function Join({ onIdSubmit }) {
  const idRef = useRef()

  // handleSubmit has to be in Link component because it is acting like a submit button
  function handleSubmit(e) {
    e.preventDefault()

    onIdSubmit(idRef.current.value)
  }

  function createNewID() {
    onIdSubmit(uuidV4())
  }

  return (
    <CenteredContainer>
      <h1 className="text-center" style={STYLES.h1}>
        Join
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="Enter your ID"
            className="mt-3"
            ref={idRef}
            style={STYLES.formControl}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3 w-100">
          Sign In
        </Button>
        <Button
          onClick={createNewID}
          variant="secondary"
          className="mt-3 w-100"
        >
          Create new ID
        </Button>
      </Form>
    </CenteredContainer>
  )
}
