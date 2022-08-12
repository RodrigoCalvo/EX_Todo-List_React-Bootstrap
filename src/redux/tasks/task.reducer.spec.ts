import { iTask } from '../../models/task';
import { taskReducer } from './task.reducer';
import * as actions from './task.action.creators';

const mockTaskArray: Array<iTask> = [
  {
    id: '1',
    responsible: 'test1',
    description: 'test1',
    completed: false,
  },
  {
    id: '2',
    responsible: 'test2',
    description: 'test2',
    completed: false,
  },
];

const mockPreviousState: Array<iTask> = [] as Array<iTask>;

describe('Given taskReducer function', () => {
  describe('When calling it with load action with a tasks array', () => {
    test('Then it should return a new state with the received array', () => {
      const newState = taskReducer(
        mockPreviousState,
        actions.loadTasksAction(mockTaskArray)
      );
      expect(newState).toEqual(mockTaskArray);
    });
  });
  describe('When calling it with add action with a task', () => {
    test('Then it should return a new state array with the new task', () => {
      const newState = taskReducer(
        mockPreviousState,
        actions.addTaskAction(mockTaskArray[0])
      );
      expect(newState).toEqual([mockTaskArray[0]]);
    });
  });
  describe('When calling it with update action with a task to update', () => {
    test('Then it should return a new state array with the updated task', () => {
      const newState = taskReducer(
        mockTaskArray,
        actions.updateTaskAction({ ...mockTaskArray[0], completed: true })
      );
      expect(newState[0].completed).toBe(true);
    });
  });
  describe('When calling it with delete action with a task id', () => {
    test('Then it should return a new state array without the associated task', () => {
      const newState = taskReducer(
        mockTaskArray,
        actions.deleteTaskAction(mockTaskArray[0].id)
      );
      expect(newState).toEqual([mockTaskArray[1]]);
    });
  });
});
