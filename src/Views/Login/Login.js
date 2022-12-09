import { Button, Input } from "antd";
import React, { useState } from "react";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./Login.scss";
const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    userName: "",
    password: "",
    code: "",
  });
  const handleOnchangeInput = (e, keyInput) => {
    console.log(e);
    const data = e.target.value.trim();
    setDataLogin({
      ...dataLogin,
      [keyInput]: data,
    });
  };
  const handleBtnLoginClick = () => {
    console.log(dataLogin);
  };
  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>
      <Input
        size="large"
        placeholder="Tên đăng nhập"
        prefix={React.createElement(UserOutlined)}
        onChange={(e) => handleOnchangeInput(e, "userName")}
        className="username-input"
      />
      <Input.Password
        className="password-input"
        size="large"
        placeholder="Mật khẩu"
        onChange={(e) => handleOnchangeInput(e, "password")}
        prefix={React.createElement(LockOutlined)}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <Input
        size="large"
        placeholder="Mã số thuế"
        onChange={(e) => handleOnchangeInput(e, "code")}
        prefix={React.createElement(UserOutlined)}
        className="code-input"
      />
      <div className="action-container">
        <span>Quên mật khẩu?</span>
        <Button
          size="large"
          type="primary"
          onClick={() => handleBtnLoginClick()}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};

export default Login;
