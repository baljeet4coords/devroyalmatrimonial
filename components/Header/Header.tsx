import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Image, Button } from "react-bootstrap";
import NavOptions from "./Navoptions";
import classes from "./Header.module.scss";
import Link from "next/link";
import ModalForm from "../HomeForm/ModalLogin";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const [stateSize, setSize] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={"p-0 color-light"}
        fixed="top"
      >
        <Container fluid className={`${classes.Navbar_Wrapper}`}>
          <Navbar.Brand className="p-0">
            <Link href="/">
              <div className={classes.navBar_logo}>
                <Image
                  src="/Images/desktopLogo.svg"
                  alt="Royal Matrimorial logo"
                />
              </div>
            </Link>
          </Navbar.Brand>
          <Nav className={`${stateSize ? classes.show : classes.hide}`}>
            <Button className=" text-light" onClick={() => setShowLoginModal(true)}>
              LOGIN
            </Button>
          </Nav>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={classes.nav_links_style}
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
                <NavDropdown.Item href="#action/3.3">Search</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Search by Profile ID
                </NavDropdown.Item>
              </NavDropdown>
              <Link href="/HelpPage">HELP</Link>
            </Nav>
            <Nav>
            <Button variant="link" className="default-anchor" onClick={() => setShowLoginModal(true)}>
              LOGIN
            </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        showLoginModal && <ModalForm onCloseModal={() => setShowLoginModal(false)}/>
      }
    </>
  );
};

export default Header;
