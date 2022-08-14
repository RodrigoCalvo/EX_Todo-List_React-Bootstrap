import { SyntheticEvent, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  FloatingLabel,
  Form,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { iTask } from '../models/task';
import { addTaskAction } from '../redux/tasks/task.action.creators';
import { addTask } from '../services/tasks.local-storage.service';
import { generateId } from '../utils/id-generator';

export function Add() {
  const [showForm, setShowForm] = useState(false);
  const initialState = { responsible: '', description: '' };
  const [formData, setFormData] = useState(initialState);
  const dispatcher = useDispatch();

  function handleChange(ev: SyntheticEvent) {
    const eventTarget = ev.target as HTMLFormElement;
    const newFormData = {
      ...formData,
      [eventTarget.name]: eventTarget.value,
    };
    setFormData(newFormData);
  }

  function handleSend() {
    const newTask: iTask = {
      id: generateId(),
      responsible: formData.responsible ? formData.responsible : 'None',
      description: formData.description
        ? formData.description
        : 'Fill this task',
      completed: false,
    };
    addTask(newTask);
    dispatcher(addTaskAction(newTask));
    setFormData(initialState);
  }

  function toggleForm() {
    if (showForm) setFormData(initialState);
    setShowForm(!showForm);
  }
  const template = (
    <Container className="mx-auto">
      {showForm ? (
        <Form className="d-flex flex-column align-items-center mt-3">
          <Form.Group className="my-2 w-100">
            <FloatingLabel label="Responsible">
              <Form.Control
                placeholder="Responsible"
                type="text"
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="my-2 w-100">
            <FloatingLabel label="Description">
              <Form.Control
                placeholder="Description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>
          <ButtonGroup>
            <Button variant="success" type="button" onClick={handleSend}>
              Save
            </Button>
            <Button variant="danger" type="button" onClick={toggleForm}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      ) : (
        <Button type="button" className="mt-4 mx-auto" onClick={toggleForm}>
          Add task
        </Button>
      )}
    </Container>
  );
  return template;
}
