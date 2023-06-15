import { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";

import classes from "./LoginHeader.module.scss";
import Link from "next/link";
import router from "next/router";
import { logoutRequest } from "../../ducks/auth/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import { step1 } from "../../ducks/regiserUser/step1/actions";
import { getProfilePicture } from "../../ducks/regiserUser/step1/selectors";
// import CustomButton from "../Button/CustomButton";
import PrivacyModal from "../PrivacyModal/PrivacyModal";
import { PrivacySettings } from "../../ducks/PrivacySetting/types";
import axios from "axios";

interface LoginHeaderProps { }
interface PrivacyState {
  showPhoto: string;
  showContact: string;
  showName: string;
}
const LoginHeader: React.FC<LoginHeaderProps> = ({ }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState<any>(-1);
  const [stateSize, setSize] = useState(false);
  const userId = useSelector(getUserId);
  const profilePicture = useSelector(getProfilePicture);

  const [privacyModal, setPrivacyModal] = useState(false);

  useEffect(() => {
    dispatch(step1({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);


  const handleClose = () => {
    setPrivacyModal(false);
  };

  const handleShow = () => setPrivacyModal(true);



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
    router.push("/");
    dispatch(logoutRequest());
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
          <Nav className={`${stateSize ? classes.show : classes.hide}`}></Nav>
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
                  <Link href="/ProfileMatch">Preferred Matches</Link>
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
            {/* <Nav className="ms-auto">
              <Link href="#">
                <FiBell />
              </Link>
            </Nav> */}
          </Navbar.Collapse>
          <NavDropdown
            title={
              <Image
                className={classes.circleImg}
                src={`${process.env.NEXT_PUBLIC_URL}/${profilePicture}`}
                alt="avatar"
              />
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
              <Link href="/DesiredProfile">Desired Partner preference</Link>
            </NavDropdown.Item>
            <NavDropdown.Item as="li">
              <Link href="/Register">Edit Profile </Link>
            </NavDropdown.Item>
            <NavDropdown.Item as="li">
              <Link href="" onClick={handleShow}>
                privacy settings{" "}
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item as="li">
              {/* <CustomButton onClick={onLogout}>Logout</CustomButton> */}
              <Link href="/" onClick={onLogout}>
                Logout
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>

      <PrivacyModal
        privacy={privacyModal}
        handleClose={handleClose}
        privacyset={setPrivacyModal}
      />
    </>
  );
};

export default LoginHeader;
