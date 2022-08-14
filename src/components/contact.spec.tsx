import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { iTask } from '../models/task';
import { iStore } from '../redux/store';
import { taskReducer } from '../redux/tasks/task.reducer';
import { Contact } from './contact';

const preloadedState: iStore = {
  tasks: [] as Array<iTask>,
};

const store = configureStore({
  reducer: { tasks: taskReducer },
  preloadedState,
});

jest.useFakeTimers();

describe('Given Conctact component', () => {
  describe('When calling it', () => {
    test('Then it should render three textboxes and one button', () => {
      render(
        <Provider store={store}>
          <Contact></Contact>
        </Provider>
      );

      const textboxes = screen.getAllByRole('textbox');
      const buttons = screen.getAllByRole('button');

      expect(textboxes).toHaveLength(3);
      expect(buttons).toHaveLength(1);
    });
  });
  describe('When writting on textboxes and click on send-button', () => {
    test('Then it should render the thank-you toast notification', () => {
      render(
        <Provider store={store}>
          <Contact></Contact>
        </Provider>
      );

      const textboxes = screen.getAllByRole('textbox');
      const sendButton = screen.getByText(/send/i);

      fireEvent.change(textboxes[0], { target: { value: 'test' } });
      fireEvent.change(textboxes[1], { target: { value: 'test' } });
      fireEvent.change(textboxes[2], { target: { value: 'test' } });
      fireEvent.click(sendButton);

      expect(screen.getByText(/thank/i)).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      const toast = screen.getByText(/thank/i).parentNode?.parentNode!;
      jest.runAllTimers();
      fireEvent.animationEnd(toast);
      const closeButton = screen.getByLabelText(/Close/i);
      fireEvent.click(closeButton);
      expect(screen.getByText(/send/i)).toBeInTheDocument();
    });
  });
});
