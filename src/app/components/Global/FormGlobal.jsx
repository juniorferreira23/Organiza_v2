import { Form, Container, Row, Col } from 'react-bootstrap';


function FormGlobal({ Header, children, Handle, Footer, Height = "100vh"}) {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: Height }}
      >
        <Row className="w-100 card-form" style={{ maxWidth: "400px" }}>
          <Col>
            <h2 className="text-center mb-4">{Header}</h2>
            <Form onSubmit={Handle}>
                {children}
            </Form>
            {Footer}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormGlobal;