import { NavDropdown, Navbar } from "react-bootstrap";
import Link from "next/link";
import classes from "./Navoptions.module.scss";

const NavOptions = () => {
    return (
        <>
         <NavDropdown title="BROWSE PROFILES BY" id="collasible-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
        </>
    )
}
export default NavOptions;