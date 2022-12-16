import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CustomButton from '../Button/CustomButton';

const HomeCard = () => {
  return (
    <Card >
      <Card.Body>
        <Card.Title>Free</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Browse Profiles</ListGroup.Item>
        <ListGroup.Item>Shortlist & Send Interest</ListGroup.Item>
        <ListGroup.Item>Message and chat with unlimited users</ListGroup.Item>
        <ListGroup.Item>Get up to 3x more matches daily</ListGroup.Item>
        <ListGroup.Item>Unlock access to advanced search</ListGroup.Item>
        <ListGroup.Item>View contact details</ListGroup.Item>
        <ListGroup.Item>Make unlimited voice and video calls</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <CustomButton onClick={() => console.log("tab")}>Get Started</CustomButton>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;