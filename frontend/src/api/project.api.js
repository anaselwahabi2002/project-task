import axios from "axios";

const API_URL = "http://localhost:8080/api/projects";

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getMyProjectsRequest = () =>
  axios.get(API_URL, { headers: getAuthHeaders() });

export const createProjectRequest = (payload) =>
  axios.post(API_URL, payload, { headers: getAuthHeaders() });

export const updateProjectRequest = (id, payload) =>
  axios.put(`${API_URL}/${id}`, payload, { headers: getAuthHeaders() });

export const deleteProjectRequest = (id) =>
  axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });

export const getProjectProgressRequest = (projectId) =>
  axios.get(`${API_URL}/${projectId}/progress`, {
    headers: getAuthHeaders(),
  });
