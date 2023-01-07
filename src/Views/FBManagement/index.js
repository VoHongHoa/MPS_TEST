import React from "react";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";

export const fbManagementSiderItems = [
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
        key: "/dash/facebook-management/pages",
        label: "Quản lý cái trang",
        screen: "Pages",
      },
      {
        key: "/dash/facebook-management/blogs",
        label: "Quản lý bài viết",
        screen: "Blogs",
      },
    ],
  },
];
export const openKeys = ["/main-funtion"];
