import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
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
  const [editable, setEditable] = useState(false);
  const dispatcher = useDispatch();

  function deleteTask() {
    deleteTaskService(data.id);
    dispatcher(deleteTaskAction(data.id));
  }

  function toggleCompleted() {
    const newTask: iTask = { ...data, completed: !data.completed };
    editTask(newTask);
  }

  function toggleEdit() {
    setEditable(!editable);
  }

  function editData() {
    console.log('Guardando...');
    toggleEdit();
  }

  function editTask(editedTask: iTask) {
    updateTask(editedTask);
    dispatcher(updateTaskAction(editedTask));
  }

  const template = (
    <>
      <InputGroup>
        <InputGroup.Checkbox
          checked={data.completed}
          onChange={toggleCompleted}
        />
        <Form.Control
          value={data.description}
          disabled={!editable}
        ></Form.Control>
        <Form.Control
          value={data.responsible}
          disabled={!editable}
        ></Form.Control>
        <Button onClick={!editable ? toggleEdit : editData}>
          {editable ? 'Save' : 'Edit'}
        </Button>
        <Button onClick={deleteTask}>Delete</Button>
      </InputGroup>
    </>
  );
  return template;
}
