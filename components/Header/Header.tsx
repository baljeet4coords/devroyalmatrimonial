
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import NavOptions from "./Navoptions";
import classes from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
    return (
        <>
        <Navbar collapseOnSelect expand="lg" className={"p-0 color-light"} fixed="top">
      <Container className={`${classes.Navbar_Wrapper} w-75`}>
        <Navbar.Brand>
        <Link href="/">
              <div className={classes.navBar_logo}>
                <Image
                  src="/Images/desktopLogo.svg"
                  alt="Royal Matrimorial logo"
                />
              </div>
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className={classes.nav_links_style}>
          <Nav className="me-auto">
          <NavOptions/>
        
            <NavDropdown title="SEARCH" id="collasible-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
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
    )
}

export default Header;