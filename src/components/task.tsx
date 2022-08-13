import { useDispatch } from 'react-redux';
import { iTask } from '../models/task';
import {
  deleteTaskAction,
  updateTaskAction,
} from '../redux/tasks/task.action.creators';
import {
  deleteTask as deleteTaskService,
  updateTask,
} from '../services/tasks.local-storage.service';

export function Task({ data }: { data: iTask }) {
  const dispatcher = useDispatch();

  function deleteTask() {
    deleteTaskService(data.id);
    dispatcher(deleteTaskAction(data.id));
  }

  function toggleCompleted() {
    const newTask: iTask = { ...data, completed: !data.completed };
    editTask(newTask);
  }

  function editTask(editedTask: iTask) {
    console.log(updateTask(editedTask));
    dispatcher(updateTaskAction(editedTask));
  }

  const template = (
    <p>
      <span>{data.responsible}</span>
      <span>{data.description}</span>
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={data.completed}
        onChange={toggleCompleted}
      />
      <input type="button" value="Delete" onClick={deleteTask} />
    </p>
  );
  return template;
}
