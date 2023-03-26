import { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import {
  Navbar,
  Container,
  Nav,
  Image,
  Button,
  NavDropdown,
} from "react-bootstrap";

import classes from "./LoginHeader.module.scss";
import Link from "next/link";
import CustomButton from "../Button/CustomButton";
import router from "next/router";
import { logoutRequest } from "../../ducks/auth/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProfilePicture } from "../../ducks/regiserUser/step1/selectors";

const LoginHeader: React.FC = () => {
  const dispatch = useDispatch();
  const profilePicture = useSelector(getProfilePicture);
  const [show, setShow] = useState<any>(-1);
  const [stateSize, setSize] = useState(false);

  const showDropdown = (indx: number) => {
    setShow(indx);
  };
  const hideDropdown = () => {
    setShow(-1);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 992);
    });
  }, []);

  const onLogout = () => {
    dispatch(logoutRequest());
    router.push("/");
  };
    
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
            <Nav className="me-auto">
              <NavDropdown
                title="MATCHES"
                id="match Dropdown"
                menuVariant="dark"
                show={show === 0 ? true : false}
                onMouseEnter={() => showDropdown(0)}
                onMouseLeave={hideDropdown}
                className=" ps-3"
              >
                <NavDropdown.Item as="li">
                  <Link href="/ProfileMatch">All Matches</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link href="/ShortListedProfile">Shortlisted Profiles</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link href="/ProfileVisitor">Profile Visitors</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="SEARCH"
                id="collasible-nav-dropdown"
                menuVariant="dark"
                show={show === 1 ? true : false}
                onMouseEnter={() => showDropdown(1)}
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
            <Nav className="ms-auto">
              <Link href="/SearchPage">
                <FiBell />
              </Link>
              <NavDropdown
                title={
                  <Link href="/SearchPage">
                    <Image
                      className={classes.circleImg}
                      src={`${process.env.NEXT_PUBLIC_URL}/${profilePicture}`}
                      alt="avatar"
                    />
                  </Link>
                }
                id="ProfileDropdown"
                menuVariant="dark"
                show={show === 2 ? true : false}
                onMouseEnter={() => showDropdown(2)}
                onMouseLeave={hideDropdown}
                className={classes.profileAvtarDrop}
                align="end"
              >
                <NavDropdown.Item as="li">
                  <Link href="/MyProfile">My Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link href="/DesiredProfile">Desired Partner Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li" className="text-center">
                  <CustomButton onClick={onLogout}>Logout</CustomButton>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default LoginHeader;
