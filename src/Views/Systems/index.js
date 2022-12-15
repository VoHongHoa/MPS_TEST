import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const systemSiderItems = [
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
      { key: "/dash/he-thong/phan-quyen", label: "Phân quyền" },
      { key: "/dash/he-thong/nguoi-dung", label: "Người dùng" },
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
  {
    key: "/catalog",
    icon: React.createElement(NotificationOutlined),
    label: "Danh mục",
    children: [
      { key: "/dash/he-thong/thong-so-he-thong", label: "Thông số hệ thống" },
      { key: "/dash/he-thong/thanh-pho", label: "Tỉnh, thành phố" },
      { key: "/dash/he-thong/quan-huyen", label: "Quận, huyện" },
    ],
  },
];
export const openKeys = ["/catalog", "/report", "/main-funtion"];
