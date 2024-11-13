import React from "react";
import { Button } from "react-bootstrap";

const SectionLink = (props) => {
  return (
    <>
      <div className="text-center mt-3">
        <span>{props.label}</span>
        <Button variant="link" onClick={props.onClick}>
          {props.text}
        </Button>
      </div>
    </>
  );
};

export default SectionLink;
