import axios from "axios";

export const loginRequest = (credentials) => {
  return axios.post(
    "http://localhost:8080/api/auth/login",
    credentials
  );
};
