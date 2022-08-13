import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routes } from '../app/App';

export function Menu() {
  const menuOptions = routes.slice(0, routes.length - 1);
  const template = (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand as={Link} to={'/'} className="ps-3">
        To-Do
      </Navbar.Brand>
      <Nav>
        {menuOptions.map((item) => (
          <Nav.Link as={Link} key={item.label} to={item.path}>
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
  return template;
}
