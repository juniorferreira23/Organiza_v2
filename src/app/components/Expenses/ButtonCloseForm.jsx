import React from "react";
import { Button } from 'react-bootstrap';

const ButtonCloseForm = ({ HandleClose }) => {
  return (
    <>
      <Button className="" type="button" onClick={HandleClose}>
        <span>x</span>
      </Button>
    </>
  );
};

export default ButtonCloseForm;