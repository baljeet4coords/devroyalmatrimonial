import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import classes from './HelpMain.module.scss';
import Link from "next/link";

const PostQuery: React.FC = () => {
    return(
        <>
        <Form className={classes.post_query}>
            <Form.Group className={classes.Query_input}>
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Email" type="email"/>
            </Form.Group>
            <Form.Group className={classes.Query_input}>
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Username" type="text"/>
            </Form.Group>
            <Form.Group className={classes.Query_input}>
                <Form.Label>Query</Form.Label>
                <Form.Control placeholder="Query" type="textarea"/>
            </Form.Group>
            <Button>Post</Button>
        </Form>
        </>
    )
}

export default PostQuery;