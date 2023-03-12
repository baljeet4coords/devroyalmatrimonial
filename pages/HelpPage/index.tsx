import { Header, Footer, LoginHeader } from "../../components";
import HelpCategories from "./HelpCategoies";
import classes from "./HelpMain.module.scss";
import { isLogin } from "../api/hello";

const HelpMain: React.FC = () => {
  return (
    <>
      <div className={classes.banner_bg}>
        {isLogin ? <LoginHeader /> : <Header />}
      </div>
      <HelpCategories />
      <Footer />
    </>
  );
};

export default HelpMain;
