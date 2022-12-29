import classes from "./Form.module.scss";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/FooterMain";


const Search: React.FC = () => {
    return (
        <>
            <div className={classes.background_banner}>
                <Header />
            </div>
            <div className={`${classes.bg_gray} w-100`}>
                <Container className={`${classes.Search_body} w-75`}>
                    <Form>
                        <Form.Group className={classes.search_group}>
                            <Form.Label>Search</Form.Label>
                            <Form.Select aria-label="Default select example" className={classes.input_select}>
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" className={classes.input_select}>
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={classes.search_group}>
                            <Form.Label>Search</Form.Label>
                            <Form.Select aria-label="Default select example" className={classes.input_select}>
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" className={classes.input_select}>
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
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
                        <Form.Group className={classes.search_group}>
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="email" placeholder="" className={classes.input_search} />
                        </Form.Group>
                        <Form.Group className={classes.search_group}>
                            <Form.Label>Search</Form.Label>
                            <Form.Select aria-label="Default select example" className={classes.input_select}>
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" className={classes.input_select}>
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={classes.search_group}>
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="email" placeholder="" className={classes.input_search} />
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
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
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
                            <Accordion.Item eventKey="2">
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
                <Footer />
            </div>
        </>
    )
}

export default Search;