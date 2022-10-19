import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
const API_ByUsername = "http://localhost:8080/api/super?username=";

const getPublicContent = () => {
  return axios.get(API_URL + "test/all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};

const getSuperAdminBoard = () => {
  return axios.get(API_URL + "test/super", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};

const getUserAllById = (id) => {
  return axios.get(API_URL + `userRole/user/${id}`);
}

const getUserRole = (params) => {
  return axios.get(API_URL + 'userRole', {params});
}

const getUserId = (userId) => {
  return axios.get(API_URL + `userRole/${userId}`);
}

const updateRoleId = (userId, data) => {
  return axios.put(API_URL + `userRole/${userId}`, data);
}

const findByUsername = (username) => {
  return axios.get(API_ByUsername + username);
}

const userService = {
  getPublicContent,
  getUserBoard,
  getSuperAdminBoard,
  getAdminBoard,
  getUserRole,
  getUserId,
  updateRoleId,
  findByUsername,
  getUserAllById
};

export default userService;