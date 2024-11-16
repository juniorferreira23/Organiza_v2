import React from "react";
import { Button} from 'react-bootstrap';

const ButtonPrimary = (props) => {
  return (
    <>
      <Button variant="primary" className="w-100 mt-4" type="submit">
        {props.text}
      </Button>
    </>
  );
};

export default ButtonPrimary;