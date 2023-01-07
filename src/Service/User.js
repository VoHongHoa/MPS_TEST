import axios from "axios";

export const signUp = (data) => {
  return axios.post("/auths/sign-up", data);
};

export const signIn = (data) => {
  return axios.post("/auths/sign-in", data);
};

export const getAllUser = () => {
  return axios.get("/users/get-all-users");
};

export const deleteUsers = (data) => {
  return axios.post("/users/delete-users", data);
};

export const searchUsers = (data) => {
  return axios.post("/users/search", data);
};
