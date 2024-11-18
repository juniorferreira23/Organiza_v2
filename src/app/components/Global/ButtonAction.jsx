import React from "react";
import { Button } from 'react-bootstrap';

const ButtonAction = ({ Variant, Handle, Text }) => {
  return (
    <>
      <Button variant={Variant} className="w-55 m-1 shadow-md" type="button" onClick={Handle}>
        {Text}
      </Button>
    </>
  );
};

export default ButtonAction;