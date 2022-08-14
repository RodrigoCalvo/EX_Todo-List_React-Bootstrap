import { SyntheticEvent, useState } from 'react';
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
  const [formData, setFormData] = useState(data);
  const [editable, setEditable] = useState(false);
  const dispatcher = useDispatch();

  function deleteTask() {
    deleteTaskService(data.id);
    dispatcher(deleteTaskAction(data.id));
  }

  function toggleCompleted() {
    const newTask: iTask = { ...data, completed: !data.completed };
    editTaskSend(newTask);
  }

  function enableEdit() {
    setEditable(true);
  }

  function disableEdit() {
    setEditable(false);
  }

  function cancelEdit() {
    setFormData(data);
    disableEdit();
  }

  function handleEditChange(ev: SyntheticEvent) {
    const eventTarget = ev.target as HTMLFormElement;
    const newData = { ...formData, [eventTarget.name]: eventTarget.value };
    setFormData(newData);
  }

  function saveEdit() {
    if (JSON.stringify(formData) !== JSON.stringify(data)) {
      const editedTask: iTask = {
        id: data.id,
        responsible: formData.responsible.trim()
          ? formData.responsible.trim()
          : 'None',
        description: formData.description.trim()
          ? formData.description.trim()
          : 'Fill this task',
        completed: data.completed,
      };
      editTaskSend(editedTask);
      setFormData(editedTask);
    }
    disableEdit();
  }

  function editTaskSend(editedTask: iTask) {
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
          name="description"
          placeholder="Description"
          value={formData.description}
          disabled={!editable}
          onChange={handleEditChange}
        ></Form.Control>
        <Form.Control
          name="responsible"
          placeholder="Responsible"
          value={formData.responsible}
          disabled={!editable}
          onChange={handleEditChange}
        ></Form.Control>
        {editable ? (
          <Button variant="success" onClick={saveEdit}>
            Save
          </Button>
        ) : (
          <Button onClick={enableEdit}>Edit</Button>
        )}
        {editable ? (
          <Button variant="warning" onClick={cancelEdit}>
            Cancel
          </Button>
        ) : (
          <Button variant="danger" onClick={deleteTask}>
            Delete
          </Button>
        )}
      </InputGroup>
    </>
  );
  return template;
}
