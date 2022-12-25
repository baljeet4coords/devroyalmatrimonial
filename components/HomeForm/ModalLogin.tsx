import classes from "./Form.module.scss";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";


const ModalForm: React.FC = () => {
    return (
        <div className={classes.modal_form}>
            <Form>
                <Form.Group className={`${classes.modal_input}`} controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email Id / Mobile Number"/>
                </Form.Group>
                <Form.Group className={`${classes.modal_input}`} controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Password"/>
                </Form.Group>
                <Link className={`${classes.modal_links} d-flex justify-content-center mb-3`} href="/">Forgot Password</Link>
                <Button variant="primary" type="submit" className={`${classes.Form_btn} p-3 mb-5 w-100`}>
                    Login
                </Button>
                <Link className={`${classes.modal_links} d-flex justify-content-center`} href="/">New On JeevanSathi?</Link>
                <Button variant="danger" type="submit" className={`${classes.Form_btn} p-3 mt-2 w-100`}>
                    Register Free
                </Button>
            </Form>
        </div>
    )
}

export default ModalForm;