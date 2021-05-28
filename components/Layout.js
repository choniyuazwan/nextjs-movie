import { Navbar, Nav } from 'react-bootstrap';

export default function Layout ({ children}) {
  return (
    <main>
      <Navbar bg='light'>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {children}
    </main>
  );
}
