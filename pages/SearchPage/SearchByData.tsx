import classes from "./Search.module.scss";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap"

const SearchByData: React.FC = () => {
    return (
        <>
            <Container className={`${classes.Search_body} w-75 mt-5`}>
                <Form>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Age</Form.Label>
                        <Form.Select aria-label="Default select example" className={classes.input_select}>
                            <option>21 years</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example" className={classes.input_select}>
                            <option>35 years</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Height</Form.Label>
                        <Form.Select aria-label="Default select example" className={classes.input_select}>
                            <option>4&#39; 0&#39;(1.22 mts)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example" className={classes.input_select}>
                            <option>7&#39; (2.13 mts) plus</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Religion</Form.Label>
                        <Form.Control type="email" placeholder="Doesn't Matter" className={classes.input_search} />
                    </Form.Group>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Mother Tongue</Form.Label>
                        <Form.Control type="email" placeholder="Doesn't Matter" className={classes.input_search} />
                    </Form.Group>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="email" placeholder="Doesn't Matter" className={classes.input_search} />
                    </Form.Group>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Residential Status</Form.Label>
                        <Form.Control type="email" placeholder="Doesn't Matter" className={classes.input_search} />
                    </Form.Group>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Income</Form.Label>
                        <Form.Select aria-label="Default select example" className={classes.input_select}>
                            <option>Rs. 0</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example" className={classes.input_select}>
                            <option>and above</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Marital Status</Form.Label>
                        <Form.Control type="email" placeholder="Doesn't Matter" className={classes.input_search} />
                    </Form.Group>
                    <Form.Group className={classes.search_group}>
                        <Form.Label>Search</Form.Label>
                        <Form.Select aria-label="Default select example" className={classes.input_select}>
                            <option>Open this select menu</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example" className={classes.input_select}>
                            <option>Open this select menu</option>
                        </Form.Select>
                    </Form.Group>
                    <Accordion defaultActiveKey={['0']} className={classes.accordion}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" className={classes.accordion}>
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                                <Form.Group className={classes.search_group}>
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control type="email" placeholder="" className={classes.input_search} />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Form>
            </Container>
        </>
    )
}

export default SearchByData;