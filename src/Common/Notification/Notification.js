import React from "react";
import "./index.css";
import { Button, notification, Space } from "antd";

export const Notification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, placement, message) => {
    api[type]({
      message: "Thông báo",
      description: message,
      placement,
    });
  };

  return { contextHolder };
};

export default Notification;
