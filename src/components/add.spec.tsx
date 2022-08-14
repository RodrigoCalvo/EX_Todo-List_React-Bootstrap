import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { iTask } from '../models/task';
import { iStore } from '../redux/store';
import { taskReducer } from '../redux/tasks/task.reducer';
import { Add } from './add';
import * as LSService from '../services/tasks.local-storage.service';

// jest.mock("../services/tasks.local-storage.service");
jest.spyOn(LSService, 'addTask');

const preloadedState: iStore = {
  tasks: [] as Array<iTask>,
};

const store = configureStore({
  reducer: { tasks: taskReducer },
  preloadedState,
});

describe('Given Add component', () => {
  describe('When calling it and clicking "Add task" button', () => {
    test('Then it should render two textboxes and two buttons', () => {
      render(
        <Provider store={store}>
          <Add></Add>
        </Provider>
      );
      const addTaskButton = screen.getByText(/add task/i);
      fireEvent.click(addTaskButton);

      const buttons = screen.getAllByRole('button');
      const textboxes = screen.getAllByRole('textbox');

      expect(buttons).toHaveLength(2);
      expect(textboxes).toHaveLength(2);
    });
  });
  describe('When writting in textbox and clicking save-button', () => {
    test('Then it should call service.addTask function', () => {
      render(
        <Provider store={store}>
          <Add></Add>
        </Provider>
      );
      const addTaskButton = screen.getByText(/add task/i);
      fireEvent.click(addTaskButton);

      const textboxes = screen.getAllByRole('textbox');
      const saveButton = screen.getByText(/save/i);

      fireEvent.change(textboxes[0], { target: { value: 'test' } });
      fireEvent.change(textboxes[1], { target: { value: 'test' } });
      fireEvent.click(saveButton);

      expect(LSService.addTask).toHaveBeenCalled();
    });
  });
  describe('When not writting in textbox and clicking save-button', () => {
    test('Then it should call service.addTask function', () => {
      render(
        <Provider store={store}>
          <Add></Add>
        </Provider>
      );
      const addTaskButton = screen.getByText(/add task/i);
      fireEvent.click(addTaskButton);

      const saveButton = screen.getByText(/save/i);
      fireEvent.click(saveButton);

      expect(LSService.addTask).toHaveBeenCalled();
    });
  });
  describe('When clicking cancel-button', () => {
    test('Then it should render only one button', () => {
      render(
        <Provider store={store}>
          <Add></Add>
        </Provider>
      );
      const addTaskButton = screen.getByText(/add task/i);
      fireEvent.click(addTaskButton);

      const saveButton = screen.getByText(/cancel/i);
      fireEvent.click(saveButton);

      const buttons = screen.getAllByRole('button');

      expect(buttons).toHaveLength(1);
    });
  });
});
