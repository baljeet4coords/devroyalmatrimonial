import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import NavOptions from "./Navoptions";
import classes from "./Header.module.scss";
import Link from "next/link";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const [stateSize, setSize] = useState(false);

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
            <Nav.Link href="#deets" className=" text-light">
              LOGIN
            </Nav.Link>
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
              <Nav.Link href="#Help">HELP</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">LOGIN</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
