import { iTask } from '../models/task';
import * as localStorageService from './tasks.local-storage.service';

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
const mockTask: iTask = {
  id: '3',
  responsible: 'test3',
  description: 'test3',
  completed: false,
};

describe('Given localStorage service', () => {
  describe('When calling getTasks function', () => {
    test('It should return an array of tasks from localStorage', () => {
      global.Storage.prototype.getItem = jest
        .fn()
        .mockReturnValueOnce(JSON.stringify(mockTaskArray));
      const result = localStorageService.getTasks();
      expect(result).toEqual(mockTaskArray);
    });
    test('It should return an array empty array if no data in localStorage', () => {
      global.Storage.prototype.getItem = jest.fn().mockReturnValueOnce(null);
      const result = localStorageService.getTasks();
      expect(result).toEqual([]);
    });
  });
  describe('When calling addTask function', () => {
    test('It should call localStorage.setItem and return the added task', () => {
      global.Storage.prototype.getItem = jest
        .fn()
        .mockReturnValueOnce(JSON.stringify(mockTaskArray));
      const result = localStorageService.addTask(mockTask);
      expect(result).toEqual(mockTask);
    });
    test('It should call localStorage.setItem and return the added task although no data in localStorage', () => {
      global.Storage.prototype.getItem = jest.fn().mockReturnValueOnce(null);
      const result = localStorageService.addTask(mockTask);
      expect(result).toEqual(mockTask);
    });
  });
  describe('When calling updateTask function', () => {
    test('It should call localStorage.setItem and return the updated task', () => {
      global.Storage.prototype.getItem = jest
        .fn()
        .mockReturnValueOnce(JSON.stringify(mockTaskArray));
      const updatedTask: iTask = { ...mockTaskArray[0], completed: true };
      const result = localStorageService.updateTask(updatedTask);
      expect(result).toEqual(updatedTask);
    });
    test('It should return undefined if there is no task to update', () => {
      global.Storage.prototype.getItem = jest
        .fn()
        .mockReturnValueOnce(JSON.stringify(mockTaskArray));
      const result = localStorageService.updateTask(mockTask);
      expect(result).toBeUndefined();
    });
    test('It should return null if no data in localStorage', () => {
      global.Storage.prototype.getItem = jest.fn().mockReturnValueOnce(null);
      const result = localStorageService.updateTask(mockTask);
      expect(result).toBeNull();
    });
  });
  describe('When calling deleteTask function', () => {
    test('It should call localStorage.setItem and return the deleted task', () => {
      global.Storage.prototype.getItem = jest
        .fn()
        .mockReturnValueOnce(JSON.stringify(mockTaskArray));
      const idToDelete = mockTaskArray[0].id;
      const result = localStorageService.deleteTask(idToDelete);
      expect(result).toEqual(mockTaskArray[0]);
    });
    test('It should return undefined if there is no task to delete', () => {
      global.Storage.prototype.getItem = jest
        .fn()
        .mockReturnValueOnce(JSON.stringify(mockTaskArray));
      const result = localStorageService.deleteTask(mockTask.id);
      expect(result).toBeUndefined();
    });
    test('It should return null if no data in localStorage', () => {
      global.Storage.prototype.getItem = jest.fn().mockReturnValueOnce(null);
      const result = localStorageService.deleteTask('');
      expect(result).toBeNull();
    });
  });
});
