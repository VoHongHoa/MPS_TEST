import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
const SiderCommon = (props) => {
  const navigate = useNavigate();

  const handleChangeNaviga = (key) => {
    navigate(key);
  };
  return (
    <Sider className="site-layout-background" width={props.widthRequest}>
      <Menu
        mode="inline"
        style={{
          height: "100vh",
        }}
        onClick={({ key }) => handleChangeNaviga(key)}
        selectedKeys={props.keyItem}
        defaultOpenKeys={props.openKeys}
        items={props.item}
      />
    </Sider>
  );
};

export default SiderCommon;
