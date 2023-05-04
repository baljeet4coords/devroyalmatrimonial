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
import { LoginType, SignUpType } from "../../ducks/auth/types";
import { loginRequest, signupRequest } from "../../ducks/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthSuccess } from "../../ducks/auth/selectors";

const Header: React.FC = () => {
  const [errors, setErrors] = useState<string>("");
  const authSuccess = useSelector(selectAuthSuccess);
  const [loginSpiner, setloginSpiner] = useState(false);

  useEffect(() => {
    if (authSuccess?.status === false) {
      setErrors("No user with this credentials can be found");
      setloginSpiner(false)
    }
    if (authSuccess && authSuccess?.output === 0) {
      setErrors("Wrong Password");
      setloginSpiner(false)
    }
    setTimeout(() => {
      return setErrors("")
    }, 5000);
  }, [
    authSuccess?.status,
    authSuccess?.jsonResponse?.user_status,
    authSuccess,
  ]);

  const onSubmitFormSignUp = (values: SignUpType) => {
    dispatch(signupRequest(values));
  };

  const dispatch = useDispatch();
  const [show, setShow] = useState<any>(-1);
  const [stateSize, setSize] = useState(
    window.innerWidth <= 992 ? true : false
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isActive, setActive] = useState(false);

  const showDropdown = () => {
    setShow(1);
  };
  const hideDropdown = () => {
    setShow(0);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 992) {
        setSize(true);
      } else {
        setSize(false);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }, []);
  const onSubmitForm = (values: LoginType) => {
    dispatch(loginRequest(values));
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={"p-0 color-light"}
        fixed="top"
      >
        <Container fluid className={`${classes.Navbar_Wrapper}`}>
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
                show={show == 1 ? true : false}
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
            <div
              className={`${classes.navLoginTabs} ${isActive ? classes.active : " "
                }`}
            >
              <Nav className="pe-3">
                <Button
                  variant="link"
                  className="default-anchor p-3"
                  onClick={() => setShowLoginModal(true)}
                >
                  LOGIN
                </Button>
              </Nav>
              <Nav className={`${classes.RegBtn}`}>
                <Button
                  variant="link"
                  className="default-anchor p-3"
                  onClick={() => window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  })}
                  style={{ opacity: `${isActive ? 1 : 0}` }}
                >
                  REGISTER FREE
                </Button>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar >
      {showLoginModal && (
        <ModalForm
          onCloseModal={setShowLoginModal}
          onSubmitForm={onSubmitForm}
          errors={errors}
          onSubmitFormSignUp={onSubmitFormSignUp}
          loginSpiner={loginSpiner}
          setloginSpiner={setloginSpiner}
        />
      )
      }
    </>
  );
};

export default Header;
