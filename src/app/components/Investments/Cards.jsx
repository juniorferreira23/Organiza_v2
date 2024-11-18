import { capitalizeFirstLetter } from "@/app/utils/formatString";
import { Container, Row, Col, Card } from "react-bootstrap";
import ButtonAction from "../Global/ButtonAction";

function Cards({ data = [], handleDelete }) {
  return (
    <Container className="py-10">
      <Row>
        {data.map((card) => {
          // Suponha 1 ano como o tempo padrão para o cálculo
          const time = 1;
          const rate = card.fees / 100; // Taxa de juros anual
          const finalAmount = card.price * Math.pow(1 + rate, time); // Fórmula de juros compostos

          return (
            <Col key={card.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>
                    {capitalizeFirstLetter(card.institution)}
                  </Card.Title>
                  <Card.Text>Purchase Date: {card.date}</Card.Text>
                  <Card.Text>
                    Invested Capital: R${card.price.toFixed(2)}
                  </Card.Text>
                  <Card.Text>{card.fees}% per Year</Card.Text>
                  <Card.Text className="text-green-600">
                    Final Amount (1 year): R${finalAmount.toFixed(2)}
                  </Card.Text>
                </Card.Body>
                <div className="px-2 pb-3">
                  <ButtonAction
                    Variant="danger"
                    Text="Delete"
                    Handle={() => handleDelete(card.id)}
                  />
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Cards;
