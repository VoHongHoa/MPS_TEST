import React from "react";
import { Layout } from "antd";
import BreadcrumbCommon from "../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../Common/Sider/SiderCommon";
import { openKeys, fbManagementSiderItems } from ".";
const { Content } = Layout;

const breadcrumbItem = ["Quản lý FB", "Dashboard"];
function FBManagementPage() {
  return (
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      <BreadcrumbCommon item={breadcrumbItem} />
      <Layout className="site-layout-background">
        <SiderCommon
          item={fbManagementSiderItems}
          widthRequest="250"
          openKeys={openKeys}
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          Quản lý facebook
        </Content>
      </Layout>
    </Content>
  );
}

export default FBManagementPage;
