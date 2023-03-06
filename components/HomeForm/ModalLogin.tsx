import classes from "./Form.module.scss";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { countryCodesObj } from "../../utils/countryCodes";

type ModalLoginProps = {
  onCloseModal: () => void;
};

const ModalForm: React.FC<ModalLoginProps> = ({ onCloseModal }) => {
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [mobilecode, setMobilecode] = useState("+91")

  const callingCodes = [];
  for (const [key, value] of Object.entries(countryCodesObj)) {
    callingCodes.push({ countryName: key, callingCode: value });
  }

  return (
    <div className={classes.modal_form}>
      <Form>
        <Form.Check
          type="switch"
          id="login_with"
          label="Login with Email"
          className={loginWithEmail ? classes.Form_Login_check :  classes.Form_Login_checkDis}
          checked={loginWithEmail}
          onChange={() => setLoginWithEmail(!loginWithEmail)}
        />
        <Form.Group
          className={`${classes.modal_input}`}
          controlId="formBasicEmail"
        >
          {loginWithEmail ? (
            <Form.Control type="email" placeholder="Enter Email Address" />
          ) : (
            <Form.Group>
              <Row>
                <Col xs={3} className="mx-0 pe-0">
                  <Form.Select
                    className={classes.MobileCode}
                    name="countryCode"
                    placeholder="Enter Mobile Number"
                    defaultValue={mobilecode}
                  >
                    {callingCodes.map(
                      (codes: { countryName: any; callingCode: any }) => {
                        return (
                          <option
                            value={codes.callingCode}
                            key={codes.countryName}
                          >
                            {codes.callingCode}
                          </option>
                        );
                      }
                    )}
                  </Form.Select>
                </Col>
                <Col xs={9} className="mx-0 ps-0">
                  <Form.Control
                    type="tel"
                    name="mobile"
                    placeholder="Enter Number"
                    className={classes.Form_input}
                  />
                </Col>
              </Row>
            </Form.Group>
          )}
        </Form.Group>
        <Form.Group
          className={`${classes.modal_input}`}
          controlId="formBasicEmail"
        >
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>
        <Link
          className={`${classes.modal_links} d-flex justify-content-center mb-3`}
          href="/"
        >
          Forgot Password
        </Link>
        <Button
          variant="primary"
          type="submit"
          className={`${classes.Form_btn} p-3 mb-5 w-100`}
        >
          Login
        </Button>
        <Link
          className={`${classes.modal_links} d-flex justify-content-center`}
          href="/"
        >
          New On Royal Matrimonial?
        </Link>
        <Button
          variant="danger"
          type="submit"
          className={`${classes.Form_btn} p-3 mt-2 w-100`}
        >
          Register Free
        </Button>
      </Form>

      <Button className={classes.modal_closeBtn} onClick={onCloseModal}>
        x
      </Button>
    </div>
  );
};

export default ModalForm;
