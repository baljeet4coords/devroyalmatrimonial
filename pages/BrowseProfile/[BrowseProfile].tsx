import React, { useState } from "react";
import { NextPage } from "next";
import { Header, Footer, LoginHeader } from "../../components";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import classes from "./BrowseProfile.module.scss";
import { getUserId } from "../../ducks/auth/selectors";
import { useSelector } from "react-redux";

const BrowseProfile: NextPage = () => {
  const router = useRouter();
  const userId = useSelector(getUserId);
  const [key, setKey] = useState("Brides");
  const headimage = "cover-image-register.jpg";

  const { BrowseProfile } = router.query;
  

  return (
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
  );
};

export default BrowseProfile;
