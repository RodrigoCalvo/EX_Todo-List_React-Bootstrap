import { Add } from '../components/add';
import { List } from '../components/list';

export function Todo() {
  const template = (
    <>
      <List></List>
      <Add></Add>
    </>
  );
  return template;
}

export default Todo;
