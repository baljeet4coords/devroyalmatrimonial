import classes from "./Card.module.scss";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CustomButton from "../Button/CustomButton";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";

const HomeCard = (props: any) => {
  let items = props.onTitle.subCategory;
  let condition = props.onlistHeight;

  return (
    <Card className={`${classes.card} ${condition ? classes.redParent : ""}`}>
      <Card.Body>
        <Card.Title className={`${classes.Cardtitle} ${props.onTitle.category === "Free" ? "" : classes.CardtitlePaid}`}>{props.onTitle.category}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {items.map((val: string, index: any) => {
          return (
            <ListGroup.Item key={val} className={condition ? classes.redCard : index > 1 ? classes.itemList : ""}>
              {props.onTitle.category === "Free" ? index < 2 ? <MdDone className={`${classes.RightTick} ${condition ? classes.svgPaid : ""} `} /> : <RxCross2 /> : <MdDone className={`${classes.RightTick} ${condition ? classes.svgPaid : ""} `} />}
              {val}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Card.Body className={classes.cardBtuoonTab}>
        <CustomButton onClick={() => console.log("tab")}>
          {props.onTitle.category === "Free"
            ? "Register For Free"
            : "Know more membership packages today"}
        </CustomButton>
      </Card.Body>
    </Card>
  );
};

export default HomeCard;
