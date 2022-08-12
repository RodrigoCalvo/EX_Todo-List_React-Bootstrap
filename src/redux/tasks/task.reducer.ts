import { createReducer } from '@reduxjs/toolkit';
import { iTask } from '../../models/task';
import * as actions from './task.action.creators';

const initialState = [] as Array<iTask>;
export const taskReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(actions.loadTasksAction, (state, action) => [...action.payload])
    .addCase(actions.addTaskAction, (state, action) => [
      ...state,
      action.payload,
    ])
    .addCase(actions.updateTaskAction, (state, action) =>
      state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      )
    )
    .addCase(actions.deleteTaskAction, (state, action) =>
      state.filter((item) => item.id !== action.payload)
    )
);
