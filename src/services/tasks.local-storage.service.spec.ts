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
const mockLocalStorage: Storage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  length: 0,
  clear: jest.fn(),
  key: jest.fn(),
  removeItem: jest.fn(),
};
// global.localStorage = mockLocalStorage;

describe('Given localStorage service', () => {
  describe('When calling getTasks function', () => {
    test('It should return an array of tasks from localStorage', () => {
      (global.localStorage.getItem as jest.Mock).mockReturnValueOnce(
        JSON.stringify(mockTaskArray)
      );
      const result = localStorageService.getTasks();
      expect(result).toEqual(mockTaskArray);
    });
    test('It should return an array empty array if no data in localStorage', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(null);
      const result = localStorageService.getTasks();
      expect(result).toEqual([]);
    });
  });
  describe('When calling addTask function', () => {
    test('It should call localStorage.setItem and return the added task', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(
        JSON.stringify(mockTaskArray)
      );
      const result = localStorageService.addTask(mockTask);
      expect(global.localStorage.setItem).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
    test('It should call localStorage.setItem and return the added task although no data in localStorage', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(null);
      const result = localStorageService.addTask(mockTask);
      expect(global.localStorage.setItem).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });
  describe('When calling updateTask function', () => {
    test('It should call localStorage.setItem and return the updated task', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(
        JSON.stringify(mockTaskArray)
      );
      const updatedTask: iTask = { ...mockTaskArray[0], completed: true };
      const result = localStorageService.updateTask(updatedTask);
      expect(global.localStorage.setItem).toHaveBeenCalled();
      expect(result).toEqual(updatedTask);
    });
    test('It should return undefined if there is no task to update', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(
        JSON.stringify(mockTaskArray)
      );
      const result = localStorageService.updateTask(mockTask);
      expect(result).toBeUndefined();
    });
    test('It should return null if no data in localStorage', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(null);
      const result = localStorageService.updateTask(mockTask);
      expect(result).toBeNull();
    });
  });
  describe('When calling deleteTask function', () => {
    test('It should call localStorage.setItem and return the deleted task', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(
        JSON.stringify(mockTaskArray)
      );
      const idToDelete = mockTaskArray[0].id;
      const result = localStorageService.deleteTask(idToDelete);
      expect(global.localStorage.setItem).toHaveBeenCalled();
      expect(result).toEqual(mockTaskArray[0]);
    });
    test('It should return undefined if there is no task to delete', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(
        JSON.stringify(mockTaskArray)
      );
      const result = localStorageService.deleteTask(mockTask.id);
      expect(result).toBeUndefined();
    });
    test('It should return null if no data in localStorage', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValueOnce(null);
      const result = localStorageService.deleteTask('');
      expect(result).toBeNull();
    });
  });
});
