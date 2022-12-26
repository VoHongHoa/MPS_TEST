import axios from "axios";

export const signUp = (data) => {
  return axios.post("/auths/sign-up", data);
};
export const getAllUser = () => {
  return axios.get("/users/get-all-users");
};
