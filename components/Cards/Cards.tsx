import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CustomButton from '../Button/CustomButton';

const HomeCard = (props:any) => {
let items = props.onTitle.subCategory;


  return (
    <Card >
      <Card.Body>
        <Card.Title>{props.onTitle.category}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {items.map((val:string) => {
          return(
            <ListGroup.Item key={val}>{val}</ListGroup.Item>
          )
        })}
      </ListGroup>
      <Card.Body>
      <CustomButton onClick={() => console.log("tab")}>Get Started</CustomButton>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;