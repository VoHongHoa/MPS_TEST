import { Button, notification } from "antd";
import React, { useCallback, useState } from "react";

import "./Login.scss";

import { loginFb } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInitFbSDK } from "../../CustomHook/FBHook";
const Login = () => {
  const isFbSDKInitialized = useInitFbSDK();
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

  return (
    <div className="login-container">
      {contextHolder}
      <div className="other-action-container">
        <Button size="large" type="primary" onClick={() => logInToFB()}>
          Đăng nhập FB
        </Button>
      </div>
    </div>
  );
};

export default Login;
