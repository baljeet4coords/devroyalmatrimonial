import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import classes from "./RegisterHeader.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectSignInSuccess } from "../../../../ducks/signIn/selectors";
import { selectSignUpSuccess } from "../../../../ducks/signUp/selectors";
import { CustomButton } from "../../../../components";
import { useRouter } from "next/router";

interface RegiserHeaderProps {
  onLogout: () => void;
}

const RegisterHeader: React.FC<RegiserHeaderProps> = ({ onLogout }) => {
  const [stateSize, setSize] = useState(false);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 992);
    });
  }, []);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={"p-0 color-light"}>
        <Container fluid className={`${classes.Navbar_Wrapper}`}>
          <Link href="/">
            <div className={classes.navBar_logo}>
              <Image
                src="/Images/Royal-Logo.png"
                alt="Royal Matrimorial logo"
              />
            </div>
          </Link>
          <Nav className={`${stateSize ? classes.show : classes.hide}`}>
            <Button variant="link" className="default-anchor p-3">
              LIVE CHAT
            </Button>
          </Nav>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={`position-relative ${classes.nav_links_style}`}
          >
            <Nav className="ms-auto pe-2">
              <Button variant="link" className="default-anchor p-3">
                LIVE CHAT
              </Button>
              <Button variant="link" className="default-anchor p-3">
                1-800-419-6299 (Toll Free)
              </Button>
              <CustomButton onClick={onLogout}>Logout</CustomButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default RegisterHeader;
