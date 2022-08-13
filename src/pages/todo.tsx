import { Add } from '../components/add';
import { List } from '../components/list';

export function Todo() {
  const template = (
    <>
      <h2>To-Do List</h2>
      <List></List>
      <Add></Add>
    </>
  );
  return template;
}

export default Todo;
