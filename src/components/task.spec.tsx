import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { iTask } from '../models/task';
import { iStore } from '../redux/store';
import { taskReducer } from '../redux/tasks/task.reducer';
import { BrowserRouter } from 'react-router-dom';
import { Task } from './task';
import * as LSService from '../services/tasks.local-storage.service';

jest.spyOn(LSService, 'updateTask');
jest.spyOn(LSService, 'deleteTask');

const mockTask: iTask = {
  id: '1',
  responsible: 'test1',
  description: 'test1',
  completed: false,
};

const preloadedState: iStore = {
  tasks: [] as Array<iTask>,
};

const store = configureStore({
  reducer: { tasks: taskReducer },
  preloadedState,
});

describe('Given the Task component', () => {
  describe('When calling it with one task data', () => {
    test('Then it should render two textboxes and two buttons', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Task data={mockTask}></Task>
          </BrowserRouter>
        </Provider>
      );

      const textboxes = screen.getAllByRole('textbox');
      const buttons = screen.getAllByRole('button');

      expect(textboxes).toHaveLength(2);
      expect(buttons).toHaveLength(2);
    });
  });
  describe('When clicking delete', () => {
    test('Then service.deleteTask', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Task data={mockTask}></Task>
          </BrowserRouter>
        </Provider>
      );

      const deleteButton = screen.getByText(/delete/i);
      fireEvent.click(deleteButton);

      const textboxes = screen.getAllByRole('textbox');
      const buttons = screen.getAllByRole('button');

      expect(textboxes).toHaveLength(2);
      expect(buttons).toHaveLength(2);
      expect(LSService.deleteTask).toHaveBeenCalled();
    });
  });
  describe('When clicking the checkbox', () => {
    test('Then service.updateTask should be called', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Task data={mockTask}></Task>
          </BrowserRouter>
        </Provider>
      );

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(LSService.updateTask).toHaveBeenCalled();
    });
  });
  describe('When clicking on edit-button and cancel-button', () => {
    test('Then it should render two textboxes and two buttons before and after', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Task data={mockTask}></Task>
          </BrowserRouter>
        </Provider>
      );

      const editButton = screen.getByText(/edit/i);
      fireEvent.click(editButton);

      const textboxes = screen.getAllByRole('textbox');
      const buttons = screen.getAllByRole('button');

      expect(textboxes).toHaveLength(2);
      expect(buttons).toHaveLength(2);

      const cancelButton = screen.getByText(/cancel/i);
      fireEvent.click(cancelButton);

      const textboxes2 = screen.getAllByRole('textbox');
      const buttons2 = screen.getAllByRole('button');

      expect(textboxes2).toHaveLength(2);
      expect(buttons2).toHaveLength(2);
    });
  });
  describe('When changing the task data and clicking save', () => {
    test('Then service.updateTask should be called', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Task data={mockTask}></Task>
          </BrowserRouter>
        </Provider>
      );

      const editButton = screen.getByText(/edit/i);
      fireEvent.click(editButton);

      const textboxes = screen.getAllByRole('textbox');
      fireEvent.change(textboxes[0], { target: { value: 'test2' } });
      fireEvent.change(textboxes[1], { target: { value: 'test2' } });

      const saveButton = screen.getByText(/save/i);
      fireEvent.click(saveButton);

      expect(LSService.updateTask).toHaveBeenCalled();
    });
  });
  describe('When deleting the task data and clicking save', () => {
    test('Then service.updateTask should be called', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Task data={mockTask}></Task>
          </BrowserRouter>
        </Provider>
      );

      const editButton = screen.getByText(/edit/i);
      fireEvent.click(editButton);

      const textboxes = screen.getAllByRole('textbox');
      fireEvent.change(textboxes[0], { target: { value: '' } });
      fireEvent.change(textboxes[1], { target: { value: '' } });

      const saveButton = screen.getByText(/save/i);
      fireEvent.click(saveButton);

      expect(LSService.updateTask).toHaveBeenCalled();
    });
  });
  describe('When not changing the task data and clicking save', () => {
    test('Then service.updateTask should not be called', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Task data={mockTask}></Task>
          </BrowserRouter>
        </Provider>
      );

      const editButton = screen.getByText(/edit/i);
      fireEvent.click(editButton);

      const saveButton = screen.getByText(/save/i);
      fireEvent.click(saveButton);

      expect(LSService.updateTask).not.toHaveBeenCalled();
    });
  });
});
