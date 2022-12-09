import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const productSiderItems = [
  {
    key: "/user-infor",
    icon: React.createElement(UserOutlined),
    label: "Thông tin người dùng",
    children: [
      { key: "/change-password", label: "Thay đổi mật khẩu" },
      { key: "/log-out", label: "Thoát tài khoản" },
    ],
  },
  {
    key: "/main-funtion",
    icon: React.createElement(LaptopOutlined),
    label: "Các chức năng chính",
    children: [
      { key: "/sale", label: "Khuyến mãi" },
      { key: "/price-board", label: "Bảng giá" },
      { key: "/product", label: "Sản phẩm" },
    ],
  },
  {
    key: "/report",
    icon: React.createElement(NotificationOutlined),
    label: "Báo cáo",
    children: [
      { key: "/dash/san-pham/groups-product", label: "Nhóm sản phẩm" },
      { key: "/dash/san-pham/categories", label: "Loại sản phẩm" },
      { key: "/dash/san-pham/unit", label: "Đơn vị tính" },
    ],
  },
];
export const openKeys = ["/report", "/main-funtion"];
