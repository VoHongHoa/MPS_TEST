import React from "react";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";

export const systemSiderItems = [
  {
    key: "/user-infor",
    icon: React.createElement(UserOutlined),
    label: "Thông tin người dùng",
    children: [
      {
        key: "/change-password",
        label: "Thay đổi mật khẩu",
        screen: "Change_Password",
      },
      { key: "/log-out", label: "Thoát tài khoản", screen: "Log_Out" },
    ],
  },
  {
    key: "/main-funtion",
    icon: React.createElement(LaptopOutlined),
    label: "Các chức năng chính",
    children: [
      {
        key: "/dash/he-thong/phan-quyen",
        label: "Phân quyền",
        screen: "Permission",
      },
      {
        key: "/dash/he-thong/nguoi-dung",
        label: "Người dùng",
        screen: "USer",
      },
    ],
  },
];
export const openKeys = ["/main-funtion"];
