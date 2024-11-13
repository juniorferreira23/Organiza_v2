import React from "react";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const InputLabel = (props) => {
  return (
    <>
      <Form.Group className="mt-3">
        <Form.Label>{props.label || "label"}</Form.Label>
        <Form.Control 
          type={props.type || "text"}
          placeholder={props.placeholder || ""}
          value={props.value}
          onChange={props.onChange}
          required
        />
      </Form.Group>
    </>
  );
};

export default InputLabel;
