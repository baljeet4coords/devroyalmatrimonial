import classes from "./Search.module.scss";
import {
  Container,
  Row,
  Col,
  Form,
  Accordion,
  InputGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { CustomButton } from "../../components";
import { useState } from "react";

const SearchByData: React.FC = () => {
  const [searchFor, setsearchFor] = useState<string>("bride");
  const [astro, setastro] = useState<boolean>(false);

  const handleAstro = () => {
    setastro(!astro);
  };

  return (
    <>
      <Container className={`${classes.Search_body} w-75 mt-5 mb-5`}>
        <Form>
          <Form.Group className={classes.search_group}>
            <Form.Label>Search for</Form.Label>
            <ButtonGroup className={classes.Button_Group}>
              <Button
                className={`${
                  searchFor == "bride"
                    ? (classes.Search_For_button,
                      classes.Search_For_button_Active)
                    : classes.Search_For_button
                }`}
                value="bride"
                onClick={(event: any) => setsearchFor(event?.target.value)}
              >
                Bride
              </Button>
              <Button
                className={`${
                  searchFor == "groom"
                    ? (classes.Search_For_button,
                      classes.Search_For_button_Active)
                    : classes.Search_For_button
                }`}
                value="groom"
                onClick={(event: any) => setsearchFor(event?.target.value)}
              >
                Groom
              </Button>
            </ButtonGroup>
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Age</Form.Label>
            <Form.Select
              aria-label="Default select example"
              className={classes.input_select}
            >
              <option>21 years</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              className={classes.input_select}
            >
              <option>35 years</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Height</Form.Label>
            <Form.Select
              aria-label="Default select example"
              className={classes.input_select}
            >
              <option>4&#39; 0&#39;(1.22 mts)</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              className={classes.input_select}
            >
              <option>7&#39; (2.13 mts) plus</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Religion</Form.Label>
            <Form.Control
              type="email"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Mother Tongue</Form.Label>
            <Form.Control
              type="email"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="email"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Residential Status</Form.Label>
            <Form.Control
              type="email"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Income</Form.Label>
            <Form.Select
              aria-label="Default select example"
              className={classes.input_select}
            >
              <option>Rs. 0</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              className={classes.input_select}
            >
              <option>and above</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Marital Status</Form.Label>
            <Form.Control
              type="email"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Photo</Form.Label>
            <ButtonGroup className={classes.Button_Group}>
              <Button
                className={`${
                  (classes.Search_For_button, classes.Search_For_button_Active)
                }  `}
              >
                All Profile
              </Button>
              <Button className={classes.Search_For_button}>
                Profile With Photo Only
              </Button>
            </ButtonGroup>
          </Form.Group>
          <hr className="mb-4" />
          <div className={classes.SectionHeading} onClick={handleAstro}>
            <h6>
              Astro <span>{astro ? " -" : " +"}</span>{" "}
            </h6>
          </div>
          {astro && (
            <div>
              <Form.Group className={classes.search_group}>
                <Form.Label>Marital Status</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Doesn't Matter"
                  className={classes.input_search}
                />
              </Form.Group>
              <Form.Group className={classes.search_group}>
                <Form.Label>Horoscope Available ?</Form.Label>
                <ButtonGroup className={classes.Button_Group}>
                  <Button
                    className={`${
                      (classes.Search_For_button,
                      classes.Search_For_button_Active)
                    }  `}
                  >
                    Yes
                  </Button>
                  <Button className={classes.Search_For_button}>
                    Does not Matter
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </div>
          )}

          <hr className="mb-4" />
          <div className={classes.SectionHeading}>
            <h6>Education & Career -</h6>
          </div>
          <Form.Group className={classes.search_group}>
            <Form.Label>Heigest Education</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>

          <hr className="mb-4" />
          <div className={classes.SectionHeading}>
            <h6>Lifestyle -</h6>
          </div>
          <Form.Group className={classes.search_group}>
            <Form.Label>Diet</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Drink</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Smoke</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>

          <hr className="mb-4" />
          <div className={classes.SectionHeading}>
            <h6>More Options -</h6>
          </div>
          <Form.Group className={classes.search_group}>
            <Form.Label>Ready to Settle Aboard ?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Challenged</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>HIV+?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Search by keyword</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doesn't Matter"
              className={classes.input_search}
            />
          </Form.Group>
          <Form.Group className={classes.search_group}>
            <Form.Label>Search by keyword</Form.Label>
            <Form.Control type="text" className={classes.Input_With_text} />
            <Button
              className={`${classes.Input_With_text_Button}`}
              variant="light"
            >
              Match all words
            </Button>
          </Form.Group>

          <CustomButton onClick={() => console.log("Search")}>
            Search
          </CustomButton>

          <Accordion defaultActiveKey={["0"]} className={classes.accordion}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className={classes.accordion}>
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
                <Form.Group className={classes.search_group}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className={classes.input_search}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Form>
      </Container>
    </>
  );
};

export default SearchByData;
