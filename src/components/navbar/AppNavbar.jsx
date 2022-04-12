import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AppNavbar = () => {
  return (
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-space-between ">
          <Navbar.Brand className="ms-5">MOVIE APP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link >Home</Nav.Link>
            <Nav.Link >Features</Nav.Link>
            <Nav.Link >Pricing</Nav.Link>
          </Nav>
      </Navbar>
  );
};

export default AppNavbar;
