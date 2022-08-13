import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { iStore } from '../redux/store';
import { Task } from './task';

export function List() {
  const tasks = useSelector((state: iStore) => state.tasks);
  const template = (
    <ListGroup>
      {tasks.map((item) => (
        <ListGroup.Item key={item.id}>
          <Task data={item}></Task>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
  return template;
}
