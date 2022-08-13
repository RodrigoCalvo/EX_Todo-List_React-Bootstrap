import { useSelector } from 'react-redux';
import { iStore } from '../redux/store';
import { Task } from './task';

export function List() {
  const tasks = useSelector((state: iStore) => state.tasks);
  const template = (
    <>
      <h2>ToDo List</h2>
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>
            <Task data={item}></Task>
          </li>
        ))}
      </ul>
    </>
  );
  return template;
}
