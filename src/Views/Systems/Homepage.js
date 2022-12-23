import React from "react";
import { Layout } from "antd";
import BreadcrumbCommon from "../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../Common/Sider/SiderCommon";
import { openKeys, systemSiderItems } from ".";
const { Content } = Layout;

const breadcrumbItem = ["Hệ thống", "Dashboard"];
function Homepage() {
  return (
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      <BreadcrumbCommon item={breadcrumbItem} />
      <Layout className="site-layout-background">
        <SiderCommon
          item={systemSiderItems}
          widthRequest="250"
          openKeys={openKeys}
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          Homepgae
        </Content>
      </Layout>
    </Content>
  );
}

export default Homepage;
