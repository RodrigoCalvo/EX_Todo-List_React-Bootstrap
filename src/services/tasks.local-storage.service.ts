import { iTask } from '../models/task';

const key = 'tasks';
function saveData(data: string): void {
  localStorage.setItem(key, data);
}
function getData(): string | null {
  return localStorage.getItem(key);
}

export function getTasks(): Array<iTask> {
  const data = getData();
  return data ? JSON.parse(data) : ([] as Array<iTask>);
}
export function addTask(newTask: iTask): iTask {
  const data = getData();
  if (data) {
    saveData(JSON.stringify([...JSON.parse(data), newTask]));
  } else {
    saveData(JSON.stringify([newTask]));
  }
  return newTask;
}

/**
 * @returns updated task, undefined if it doesn't exist, null if no data in localStorage
 */
export function updateTask(updatedTask: iTask): iTask | undefined | null {
  const data = getData();
  if (data) {
    if (
      !(JSON.parse(data) as Array<iTask>).find(
        (item) => item.id === updatedTask.id
      )
    )
      return undefined;
    saveData(
      JSON.stringify(
        (JSON.parse(data) as Array<iTask>).map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        )
      )
    );
  } else {
    return null;
  }
  return updatedTask;
}

/**
 * @returns deleted task, undefined if it doesn't exist, null if no data in localStorage
 */
export function deleteTask(idToDelete: iTask['id']): iTask | null | undefined {
  const data = getData();
  let taskToDelete: iTask | undefined;
  if (data) {
    taskToDelete = (JSON.parse(data) as Array<iTask>).find(
      (item) => item.id === idToDelete
    );
    saveData(
      JSON.stringify(
        (JSON.parse(data) as Array<iTask>).filter(
          (item) => item.id !== idToDelete
        )
      )
    );
    return taskToDelete;
  } else {
    return null;
  }
}
