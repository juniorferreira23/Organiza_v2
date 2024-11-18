import Card from 'react-bootstrap/Card';

function CardDashboard({Title, Value}) {
  return (
    <Card className="m-3" style={{ width: '13rem' }}>
      <Card.Body>
        <Card.Text>{Title}</Card.Text>
        <Card.Title>R${Value}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardDashboard;