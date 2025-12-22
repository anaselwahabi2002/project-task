import { loginRequest } from "../api/auth.api";

export const login = async (credentials) => {
  const response = await loginRequest(credentials);
  const token = response.data.token;

  localStorage.setItem("token", token);

  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

