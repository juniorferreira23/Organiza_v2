import { capitalizeFirstLetter } from "@/app/utils/formatString";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";

function CardsGrid({ data = [] }) {
  const [notifiedCategories, setNotifiedCategories] = useState([]);

  const handleNotify = () => {
    data.forEach((obj) => {
      if (
        obj.expense > obj.limit &&
        !notifiedCategories.includes(obj.category)
      ) {
        setNotifiedCategories((prev) => [...prev, obj.category]);
        // alert(
        //   `Atenção! A categoria "${capitalizeFirstLetter(
        //     obj.category
        //   )}" ultrapassou o limite.`
        // );
      }
    });
  };

  useEffect(() => {
    handleNotify();
  }, [handleNotify]);

  return (
    <Container>
      <Row>
        {data.map((card) => {
          const progress = (card.expense / card.limit) * 100;
          const variant =
            progress > 100 ? "danger" : progress > 80 ? "warning" : "sucess";

          return (
            <Col
              key={card.category}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    {capitalizeFirstLetter(card.category)}
                  </Card.Title>
                  <div className="d-flex">
                    <Card.Text>R${card.expense}</Card.Text>
                    <span className="px-1">/</span>
                    <Card.Text>R${card.limit}</Card.Text>
                  </div>
                  <ProgressBar
                    now={progress}
                    label={`${Math.round(progress)}%`}
                    variant={variant}
                  />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default CardsGrid;
