import { configureStore } from '@reduxjs/toolkit';
import { iTask } from '../models/task';
import { taskReducer } from './tasks/task.reducer';

export interface iStore {
  tasks: Array<iTask>;
}

const preloadedState: iStore = {
  tasks: [] as Array<iTask>,
};

export const store = configureStore({
  reducer: { tasks: taskReducer },
  preloadedState,
});
