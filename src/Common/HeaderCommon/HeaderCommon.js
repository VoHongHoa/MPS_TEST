import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./HeaderCommon.scss";
import { Modules } from ".";

const { Header } = Layout;

function HeaderCommon() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState();
  const handleChangeNaviga = (key) => {
    setSelectedItem(key);
    navigate(key);
  };

  return (
    <Header className="header header-container">
      <Menu
        theme="dark"
        mode="horizontal"
        items={Modules}
        selectedKeys={selectedItem}
        defaultSelectedKeys="/dash"
        onClick={({ key }) => handleChangeNaviga(key)}
      ></Menu>
    </Header>
  );
}

export default HeaderCommon;
