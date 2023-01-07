import { Button, Input, notification } from "antd";
import React, { useCallback, useState } from "react";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import "./Login.scss";
import { signIn } from "../../Service/User";
import { loginFailed, loginSuccess, loginFb } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInitFbSDK } from "../../CustomHook/FBHook";
const Login = () => {
  const isFbSDKInitialized = useInitFbSDK();
  const [dataLogin, setDataLogin] = useState({
    userName: "",
    password: "",
    code: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [userAccessToken, setFbUserAccessToken] = useState();
  const openNotification = useCallback(
    (type, placement, message) => {
      api[type]({
        message: `Thông báo`,
        description: message,
        placement,
      });
    },
    [api]
  );
  const handleOnchangeInput = (e, keyInput) => {
    const data = e.target.value.trim();
    setDataLogin({
      ...dataLogin,
      [keyInput]: data,
    });
  };

  const logInToFB = React.useCallback(() => {
    try {
      window.FB.login((response) => {
        console.log("Check res login", response);
        if (response && response.status === "connected") {
          dispatch(loginFb(response));
          setFbUserAccessToken(response.authResponse.accessToken);
        }
      });
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
    }
  }, []);

  const handleBtnLoginClick = async () => {
    try {
      const res = await signIn(dataLogin);
      if (res && res.status === 200 && res.data.success === true) {
        dispatch(loginSuccess(res.data.user));
        navigate("/dash");
      } else {
        openNotification("error", "topRight", res.data.message);
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  return (
    <div className="login-container">
      {contextHolder}
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

      <div className="other-action-container">
        <span>Hoặc</span>
        <Button size="large" type="primary" onClick={() => logInToFB()}>
          Đăng nhập FB
        </Button>
      </div>
    </div>
  );
};

export default Login;
