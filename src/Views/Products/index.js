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
      { key: "/sale", label: "Khuyến mãi", screen: "Sale" },
      { key: "/price-board", label: "Bảng giá", screen: "Price_Board" },
      { key: "/product", label: "Sản phẩm", screen: "Product" },
    ],
  },
  {
    key: "/report",
    icon: React.createElement(NotificationOutlined),
    label: "Báo cáo",
    children: [
      {
        key: "/dash/san-pham/groups-product",
        label: "Nhóm sản phẩm",
        screen: "Product_Ground",
      },
      {
        key: "/dash/san-pham/categories",
        label: "Loại sản phẩm",
        screen: "Catagories",
      },
      { key: "/dash/san-pham/unit", label: "Đơn vị tính", screen: "Unit" },
    ],
  },
];
export const openKeys = ["/report", "/main-funtion"];
