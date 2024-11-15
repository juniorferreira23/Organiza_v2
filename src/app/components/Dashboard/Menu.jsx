import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from "next/navigation";

function Menu() {
  const router = useRouter();

  const handlerLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/dashboard">Organiza</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              <Nav.Link href="/dashboard/expenses">Expenses</Nav.Link>
              <Nav.Link href="/dashboard/Investments">Investments</Nav.Link>
              <Nav.Link onClick={handlerLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;