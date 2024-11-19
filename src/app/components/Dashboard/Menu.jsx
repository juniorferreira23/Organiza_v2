import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from "next/navigation";
import { getUserName } from '@/app/services/Users';
import { useEffect, useState } from 'react';

function Menu() {
  const [name, setName] = useState("");

  const router = useRouter();

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id;
  };

  const handlerLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleName = async () => {
    const id = getUserId()
    const response = await getUserName(id)

    setName(response)
  }

  useEffect(() => {
    handleName()
  }, [])

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand href="pages/dashboard">Organiza</Navbar.Brand>
          <Nav.Item className="nav-username">Hello, {name}!</Nav.Item>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
            <Nav className="me-auto">
              <Nav.Link href="/pages/dashboard">Home</Nav.Link>
              <Nav.Link href="/pages/dashboard/expenses">Expenses</Nav.Link>
              <Nav.Link href="/pages/dashboard/budget">Budget</Nav.Link>
              <Nav.Link href="/pages/dashboard/investments">Investments</Nav.Link>
              <Nav.Link onClick={handlerLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;