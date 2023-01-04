import classes from "./Search.module.scss";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap"


const SearchById: React.FC = () => {
    return (
        <>
        <Container className={`${classes.Search_body} w-75 mt-5`}>
                <Form>
                    <Form.Group className={classes.search_group}>
                        <Form.Control type="email" placeholder="Doesn't Matter" className={classes.input_search} />
                    </Form.Group>
                </Form>
        </Container>
        </>
    )
}

export default SearchById;