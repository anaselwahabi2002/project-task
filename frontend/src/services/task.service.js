import {
  getTasksByProjectRequest,
  createTaskRequest,
  updateTaskRequest,
  completeTaskRequest,
  deleteTaskRequest,
} from "../api/task.api";

export const getTasksByProject = async (projectId) => {
  if (!projectId) return [];
  const res = await getTasksByProjectRequest(projectId);
  return res.data;
};

export const createTask = async (projectId, task) => {
  const res = await createTaskRequest(projectId, task);
  return res.data;
};

export const updateTask = async (taskId, task) => {
  const res = await updateTaskRequest(taskId, task);
  return res.data;
};

export const completeTask = async (taskId) => {
  await completeTaskRequest(taskId);
};

export const deleteTask = async (taskId) => {
  await deleteTaskRequest(taskId);
};
