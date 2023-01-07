import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const content = isLogin === true ? children : <Navigate to={"/"} />;
  return content;
};

export default PrivateRoute;
