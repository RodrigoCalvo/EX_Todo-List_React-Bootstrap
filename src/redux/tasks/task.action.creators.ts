import { createAction } from '@reduxjs/toolkit';
import { iTask } from '../../models/task';
import { actionTypes } from './task.action.types';

export const loadTasksAction = createAction<Array<iTask>>(
  actionTypes['task@load']
);
export const addTaskAction = createAction<iTask>(actionTypes['task@add']);
export const updateTaskAction = createAction<iTask>(actionTypes['task@update']);
export const deleteTaskAction = createAction<iTask['id']>(
  actionTypes['task@delete']
);
