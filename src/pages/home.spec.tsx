import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { iTask } from '../models/task';
import { iStore } from '../redux/store';
import { taskReducer } from '../redux/tasks/task.reducer';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './home';

const preloadedState: iStore = {
  tasks: [] as Array<iTask>,
};

const store = configureStore({
  reducer: { tasks: taskReducer },
  preloadedState,
});

describe('Given the Home page component', () => {
  describe('When calling it', () => {
    test('Then it should render', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Home></Home>
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/this/i)).toBeInTheDocument();
    });
  });
});
