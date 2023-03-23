import { Footer, Header } from "../../components";
import HelpCategories from "./HelpCategoies";
import classes from "./HelpMain.module.scss";

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
