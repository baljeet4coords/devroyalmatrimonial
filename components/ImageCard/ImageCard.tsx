import { ImageData } from "../../components/ImageCard/ImageData";
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
const ImageCard = (props: any) => {
  const data = ImageData;

  return (
    <>
      {data.map((item) => {
        return (
          <Col key={item.heading} lg={3} md={4} style={{ paddingTop: '0.75rem' }}>
            <Card>
              <Card.Img variant="top" src="/Images/dummyGirlImage.jpg" />
              <Card.Body>
                <Card.Title>{`${item.heading}`}</Card.Title>
                <Card.Text>
                  {`${item.para} ${props.onProfile}`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </>
  );
}

export default ImageCard;