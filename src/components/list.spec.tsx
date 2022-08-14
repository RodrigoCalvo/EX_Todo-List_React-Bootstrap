import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { iTask } from '../models/task';
import { iStore } from '../redux/store';
import { taskReducer } from '../redux/tasks/task.reducer';
import { BrowserRouter } from 'react-router-dom';
import { List } from './list';

const preloadedState: iStore = {
  tasks: [
    {
      id: '1',
      responsible: 'test',
      description: 'test',
      completed: false,
    },
  ] as Array<iTask>,
};

const store = configureStore({
  reducer: { tasks: taskReducer },
  preloadedState,
});

describe('Given the List component', () => {
  describe('When calling it with one single task in the store', () => {
    test('Then it should render two textboxes', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <List></List>
          </BrowserRouter>
        </Provider>
      );

      const textboxes = screen.getAllByRole('textbox');

      expect(textboxes).toHaveLength(2);
    });
  });
});
