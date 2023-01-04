import { Col, Container, Row, Image, Form } from "react-bootstrap";
import classes from "./HelpMain.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import HelpCallback from "./HelpCallback";
import PostQuery from "./PostQuery";

const HelpCategories: React.FC = () => {
  const [HelpModal, setHelpModal] = useState<boolean>(false);
  const [PostForm, setPostForm] = useState<boolean>(false);
  return (
    <>
      <div className={`${classes.bg_gray}`}>
        <Container className={`${classes.Help_wrapper}`}>
          <Row>
            <Col lg={8} className={classes.b_right}>
              <span className={classes.header_Help}>How can we help you?</span>
              <div className="d-flex justify-content-center">
                <input placeholder="What can we help width"></input>
                <button>Search</button>
              </div>
              <Row>
                <h4>Categories</h4>
                <Col sm={6} className={classes.categories}>
                  <span>Getting Started</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Privacy Settings</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Search Profile</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Initiate Contact</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Membership</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Login/Password</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Fraud Alert</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Help Center/Customer Support</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Common Issues</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Changes Basic details</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Getting Responses</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Add On Services</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Manage Your Profile</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>JSExclusive</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Video Profiles</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Match Hour</span>
                  <Link href="/">View all Questions</Link>
                </Col>
                <Col sm={6} className={classes.categories}>
                  <span>Introducing Free Chat on Jeevanathi</span>
                  <Link href="/">View all Questions</Link>
                </Col>
              </Row>
              <span className={classes.header_Help}>
                <a onClick={() => setPostForm(true)}>Post your query_</a> and we
                will get back to you
              </span>
              {PostForm && <PostQuery />}
            </Col>
            <Col lg={4}>
              <span className={classes.header_Help}>Write to us</span>
              <Link className={classes.email_help} href="/">
                help@royalmatrimonial.com
              </Link>
              <div className={classes.callback_btn}>
                <button type="submit" onClick={() => setHelpModal(true)}>
                  Request Callback
                </button>
                <span>Our Customer will get back to you</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {HelpModal && <HelpCallback onCloseModal={() => setHelpModal(false)} />}
    </>
  );
};

export default HelpCategories;
