import { Footer, LoginHeader } from "../../components";
import HelpCategories from "./HelpCategoies";
import classes from "./HelpMain.module.scss";

const HelpMain: React.FC = () => {
  return (
    <>
      <div className={classes.banner_bg}>
        <LoginHeader />
      </div>
      <h1 className="text-center text-danger py-5 my-5">
        This Feature Is Coming Soon!
      </h1>
      {/* <HelpCategories /> */}
      <Footer />
    </>
  );
};

export default HelpMain;
