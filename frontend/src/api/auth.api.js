import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const loginRequest = (payload) =>
  axios.post(`${API_URL}/login`, payload);
