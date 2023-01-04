import {Form, Button} from 'react-bootstrap';
import classes from "./Form.module.scss";

const HomeForm = () => {
  return (
    <Form className={`${classes.Form_Wrapper} ms-auto`}>
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Create Profile For</Form.Label>
        <Form.Control type="email" placeholder="" className={classes.Form_input} />
        {/* <Form.Text className="text-muted">
        Please choose whose profile is being created.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" className={classes.Form_input} />
        {/* <Form.Text className="text-muted">
        Please choose whose profile is being created.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="tel" placeholder="Enter Number" className={classes.Form_input} />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" className={classes.Form_input} />
      </Form.Group>

      {/* <Form.Group className={`${classes.form_style} mb-3`} controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="danger" type="submit" className={`${classes.Form_btn} mt-2 w-100`}>
        Register Free
      </Button>
    </Form>
  );
}

export default HomeForm;