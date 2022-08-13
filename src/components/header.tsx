import { Menu } from './menu';

export function Header() {
  const template = (
    <header>
      <h1>ToDo List</h1>
      <Menu></Menu>
    </header>
  );
  return template;
}
