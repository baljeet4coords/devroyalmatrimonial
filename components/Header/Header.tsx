import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Image,
  Button,
} from "react-bootstrap";
import NavOptions from "./Navoptions";
import classes from "./Header.module.scss";
import Link from "next/link";
import ModalForm from "../HomeForm/ModalLogin";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const [stateSize, setSize] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isActive, setActive] = useState(false);


  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 992);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 500){
        setActive(true);
      }else{
        setActive(false);
      }
      console.log("yes");
    });
  }, []);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={"p-0 color-light"}
        fixed="top"
      >
        <Container fluid className={`${classes.Navbar_Wrapper}`}>
          {/* <Navbar.Brand className="p-0"> */}
            <Link href="/">
              <div className={classes.navBar_logo}>
                <Image
                  src="/Images/Royal-Logo.png"
                  alt="Royal Matrimorial logo"
                />
              </div>
            </Link>
          {/* </Navbar.Brand> */}
          <Nav className={`${stateSize ? classes.show : classes.hide}`}>
            <Button
              className="white-bg-button"
              onClick={() => setShowLoginModal(true)}
            >
              LOGIN
            </Button>
          </Nav>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={`position-relative ${classes.nav_links_style}`}
          >
            <Nav className="me-auto">
              <NavOptions />

              <NavDropdown
                title="SEARCH"
                id="collasible-nav-dropdown"
                menuVariant="dark"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <NavDropdown.Item as="li">
                  <Link href="/SearchPage">Search</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link href="/SearchPage">Search by Profile ID</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Link href="/HelpPage">HELP</Link>
            </Nav>
              <div className={`${classes.navLoginTabs} ${isActive ? classes.active : " "}`} >
                <Nav className="pe-3">
                  <Button
                    variant="link"
                    className="default-anchor p-3"
                    onClick={() => setShowLoginModal(true)}
                  >
                    LOGIN
                  </Button>
                </Nav>
                <Nav className="pe-3">
                  <Button
                    variant="link"
                    className="default-anchor p-3"
                    onClick={() => setShowLoginModal(true)}
                    style={{opacity : `${isActive ? 1: 0}`}}
                  >
                    REGISTER FREE
                  </Button>
                </Nav>
              </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showLoginModal && (
        <ModalForm onCloseModal={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Header;
