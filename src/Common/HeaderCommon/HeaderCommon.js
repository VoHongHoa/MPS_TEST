import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./HeaderCommon.scss";
const { Header } = Layout;

const items = [
  { label: "Hệ thống", key: "/dash" },
  { label: "Sản phẩm", key: "/dash/san-pham" },
  { label: "Bán hàng" },
  { label: "Dự án" },
];
function HeaderCommon() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState();
  const handleChangeNaviga = (key) => {
    setSelectedItem(key);
    navigate(key);
  };

  return (
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={selectedItem}
        defaultSelectedKeys="/dash"
        onClick={({ key }) => handleChangeNaviga(key)}
      ></Menu>
    </Header>
  );
}

export default HeaderCommon;
