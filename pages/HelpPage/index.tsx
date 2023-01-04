import { Header, Footer } from "../../components";
import HelpCategories from "./HelpCategoies";
import { Col, Container, Row, Image, Form } from "react-bootstrap";
import classes from "./HelpMain.module.scss";
import Link from "next/link";

const HelpMain: React.FC = () => {
  return (
    <>
      <div className={classes.banner_bg}>
        <Header />
      </div>
      <HelpCategories />
      <Footer />
    </>
  );
};

export default HelpMain;
