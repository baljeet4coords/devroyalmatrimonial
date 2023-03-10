import { Container, Row } from "react-bootstrap";
import classes from "./ShortVisitorProfile.module.scss";

interface ShortVisitorProps{
  title: string;
  subtitle: string;
}

const ShortVisitorProfile: React.FC<ShortVisitorProps> = ({title , subtitle}) => {

  return (
    <Container className={`${classes.cardWrapper}  position-relative`}>
      <Row sm={12} lg={12} className="mb-3">
        <div className={classes.maincard}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </Row>
    </Container>
  );
};

export default ShortVisitorProfile;
