import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // backend port
  withCredentials: true, // agar cookies use ho rahi ho
});

// Set or remove token
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
}

export default api;
