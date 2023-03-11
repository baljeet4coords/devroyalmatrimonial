import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "./ProfileCard.module.scss";
import { AiFillLock } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import { BiMessageCheck } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import { BsChat, BsStarFill, BsFlag } from "react-icons/bs";
import { TbHistory } from "react-icons/tb";
import { ImShare, ImBlocked } from "react-icons/im";

const ProfileCard: React.FC = () => {
  const obj = [
    {
      details: {
        img: "./Images/profile_image.webp",
        name: "Sweta Singh",
        id: "(WSYY4227)",
        lastSeen: "Last seen on 19-Feb-23",
      },
      subDetail: {
        details: [
          "29, 5' 5'",
          "MBA/PGDM, B.E/B.Tech",
          "New Delhi",
          "Analyst",
          "Chandravanshi Kahar",
          "Rs. 10 - 15 Lakh per Annum",
          "Hindi-Delhi",
          "Never Married",
        ],
      },
    },
    {
      details: {
        img: "./Images/profile_image.webp",
        name: "Sweta Singh",
        id: "(WSYY4227)",
        lastSeen: "Last seen on 19-Feb-23",
      },
      subDetail: {
        details: [
          "29, 5' 5'",
          "MBA/PGDM, B.E/B.Tech",
          "New Delhi",
          "Analyst",
          "Chandravanshi Kahar",
          "Rs. 10 - 15 Lakh per Annum",
          "Hindi-Delhi",
          "Never Married",
        ],
      },
    },
  ];
  return (
    <Container className={classes.cardWrapper}>
      {obj.map((e) => {
        return (
          <>
            <Row sm={12} lg={12} className="mb-3">
              <Col sm={3} md={4} lg={4} xl={3} className="p-0 d-flex justify-content-end">
                <Image src={e.details.img} alt={e.details.id}/>
              </Col>
              <Col sm={8}  md={8} lg={7} xl={8}  className={classes.cardInfo}>
                <div className={`${classes.UserName_Section} border-bottom border-dark pb-2`}>
                  <span>{e.details.name} </span>
                  <small className="pe-2">{e.details.id}</small>
                  {/* <span className={classes.lockIcon}><AiFillLock/></span>  */}
                  <span className={classes.tickIcon}>
                    <GoVerified />
                  </span>
                  <small>{e.details.lastSeen}</small>
                </div>
                <ul>{<li key={e.details.id}>{e.subDetail.details}</li>}</ul>
                <div>
                  <span>
                    <TbHistory />
                  </span>
                  <span className="ps-3">
                    <ImShare />
                  </span>
                  <span className="ps-3">
                    <ImBlocked />
                  </span>
                  <span className="ps-3">
                    <BsFlag />
                  </span>
                </div>
              </Col>
              <Col sm={1} md={12} lg={1} xl={1} className={classes.rightBox}>
                <p>
                  <BiMessageCheck />
                </p>
                <p>
                  <MdContactPhone />
                </p>
                <p>
                  <BsChat />
                </p>
                <p>
                  <BsStarFill />
                </p>
              </Col>
            </Row>
          </>
        );
      })}
    </Container>
  );
};

export default ProfileCard;
