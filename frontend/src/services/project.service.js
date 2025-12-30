import {
  getMyProjectsRequest,
  createProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
  getProjectProgressRequest,
} from "../api/project.api.js";

export const getMyProjects = async () => {
  const res = await getMyProjectsRequest();
  return res.data;
};

export const createProject = async (project) => {
  const res = await createProjectRequest(project);
  return res.data;
};

export const updateProject = async (id, project) => {
  const res = await updateProjectRequest(id, project);
  return res.data;
};

export const deleteProject = async (id) => {
  await deleteProjectRequest(id);
};

export const getProjectProgress = async (projectId) => {
  const res = await getProjectProgressRequest(projectId);
  return res.data;
};
