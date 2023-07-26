import { Container } from "react-bootstrap";
import { Footer, Header, HomeImage, LoginHeader } from "../../components";
import HelpCategories from "./HelpCategoies";
import classes from "./HelpMain.module.scss";
import { getUserId } from "../../ducks/auth/selectors";
import { useSelector } from "react-redux";

const HelpMain: React.FC = () => {
  const userId = useSelector(getUserId);
  const headimage = "cover-image-register.jpg";
  return (
    <>
      <div style={{ background: "#e7e6e6" }}>
        <Container fluid className={classes.banner_bg}>
          {userId ? <LoginHeader /> : <Header />}
        </Container>
        <h1 className="text-center text-danger py-5 my-5">
          This Feature Is Coming Soon!
        </h1>
        {/* <HelpCategories /> */}
        <Footer />
      </div>
    </>
  )
}
export default HelpMain;
