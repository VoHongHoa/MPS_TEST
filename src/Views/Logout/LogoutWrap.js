import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const LogoutWrap = ({ children }) => {
  const dispatch = useDispatch();
  const doSomething = () => {
    dispatch(logout());
  };
  useEffect(() => {
    doSomething();
  }, []);
  return children;
};

export default LogoutWrap;
