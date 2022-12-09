import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import FooterCommon from "./FooterCommon/FooterCommon";
import HeaderCommon from "./HeaderCommon/HeaderCommon";
import "./DashLayout.scss";
const DashLayout = () => {
  return (
    <Layout>
      <div className="header-container">
        <HeaderCommon />
      </div>
      <div className="dash-container">
        <Outlet />
      </div>
      <FooterCommon />
    </Layout>
  );
};

export default DashLayout;
