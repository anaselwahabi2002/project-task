import axios from "axios";

const API = "http://localhost:8080/api";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getTasksByProject = async (projectId) => {
  // ✅ si quelqu’un passe un array, on ignore au lieu de throw
  if (Array.isArray(projectId)) {
    console.warn("getTasksByProject received an array (wrong usage).", projectId);
    return []; // ✅ pas de crash
  }

  const id =
    typeof projectId === "object"
      ? (projectId?.id ?? projectId?._id)
      : projectId;

  if (!id) return []; // ✅ pas de crash non plus

  const res = await axios.get(`${API}/projects/${encodeURIComponent(id)}/tasks`, {
    headers: authHeaders(),
  });
  return res.data;
};


export const createTask = async (projectId, payload) => {
  const id = typeof projectId === "object" ? projectId?.id : projectId;
  if (!id) throw new Error("createTask: projectId is missing/invalid");

  const res = await axios.post(`${API}/projects/${encodeURIComponent(id)}/tasks`, payload, {
    headers: authHeaders(),
  });
  return res.data;
};


export const updateTask = async (taskId, payload) => {
  const res = await axios.put(`${API}/tasks/${taskId}`, payload, {
    headers: authHeaders(),
  });
  return res.data;
};

export const completeTask = async (taskId) => {
  await axios.put(`${API}/tasks/${taskId}/complete`, null, {
    headers: authHeaders(),
  });
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API}/tasks/${taskId}`, {
    headers: authHeaders(),
  });
};
