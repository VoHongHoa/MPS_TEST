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
