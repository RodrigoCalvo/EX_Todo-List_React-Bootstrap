import { Link } from 'react-router-dom';
import { routes } from '../app/App';

export function Menu() {
  const menuOptions = routes.slice(0, routes.length - 1);
  const template = (
    <ul>
      {menuOptions.map((item) => (
        <li key={item.label}>
          <Link to={item.path}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
  return template;
}
