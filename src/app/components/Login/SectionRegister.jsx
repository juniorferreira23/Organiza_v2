import React from "react";
import { Button } from "react-bootstrap";

const SectionRegister = (props) => {
  return (
    <>
      <div className="text-center mt-3">
        <span>{props.label || "Não tem uma conta?"}</span>
        <Button variant="link" onClick={() => props.function || console.log("click")}>
          {props.text || "Registrar"}
        </Button>
      </div>
    </>
  );
};

export default SectionRegister;
