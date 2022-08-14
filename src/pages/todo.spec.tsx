import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { iTask } from '../models/task';
import { iStore } from '../redux/store';
import { taskReducer } from '../redux/tasks/task.reducer';
import { BrowserRouter } from 'react-router-dom';
import { Todo } from './todo';

const preloadedState: iStore = {
  tasks: [] as Array<iTask>,
};

const store = configureStore({
  reducer: { tasks: taskReducer },
  preloadedState,
});

describe('Given the Todo page component', () => {
  describe('When calling it', () => {
    test('Then it should render', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Todo></Todo>
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/list/i)).toBeInTheDocument();
    });
  });
});
