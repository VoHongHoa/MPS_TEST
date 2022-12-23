import axios from "axios";

export const createRole = (data) => {
  return axios.post("/roles", data);
};

export const getAllRole = () => {
  return axios.get("/roles");
};

export const deleteRole = (data) => {
  return axios.post("/roles/delete", data);
};
export const updateRole = (data, roleId) => {
  return axios.patch(`/roles/${roleId}`, data);
};
export const search = (data) => {
  return axios.post("/roles/search", data);
};

export const updatePermission = (data, roleId) => {
  return axios.post(`/roles/permission/${roleId}`, data);
};

export const getRoleById = (roleId) => {
  return axios.get(`/roles/get-role/${roleId}`);
};
