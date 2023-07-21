import { Container, Image, Row } from "react-bootstrap";
import classes from "./ShortVisitorProfile.module.scss";

interface ShortVisitorProps {
  title: string;
  subtitle: string;
  image?: string;
}

const ShortVisitorProfile: React.FC<ShortVisitorProps> = ({ title, subtitle, image }) => {

  return (
    <Container className={`${classes.cardWrapper}  position-relative`}>
      <Row sm={12} lg={12} className="mb-3">
        <div className={classes.maincard}>
          <Image src={image ? image : "./Images/shortlist0.svg"} height={200} alt="done" className="pe-1" />
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </Row>
    </Container>
  );
};

export default ShortVisitorProfile;
