import { Form, Container, Row, Col } from "react-bootstrap";
import ButtonCloseForm from "../Expenses/ButtonCloseForm";

function FormFloanting({ Header, children, Handle, Footer, Height = "100vh", HandleClose}) {
  return (
    <>
      <Container
        className="position-absolute top-50 start-50 translate-middle w-100 ml-3"
        style={{ minHeight: Height, maxWidth: "400px" }}
      >
        <Row className="w-100 card-form" style={{ maxWidth: "400px", boxShadow: "0px 8px 10px #888" }}>
          <Col>
            <ButtonCloseForm HandleClose={HandleClose}/>
            <h2 className="text-center mb-4">{Header}</h2>
            <Form onSubmit={Handle}>{children}</Form>
            {Footer}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormFloanting;
