import { SyntheticEvent, useState } from 'react';
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
    <div>
      <button type="button" onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Add task'}
      </button>
      {showForm ? (
        <form>
          <label htmlFor="responsible">Responsible:</label>
          <input
            type="text"
            id="responsible"
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input type="button" value="Send" onClick={handleSend} />
        </form>
      ) : (
        <></>
      )}
    </div>
  );
  return template;
}
