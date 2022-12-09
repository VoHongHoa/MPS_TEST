import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import BreadcrumbCommon from "../../Common/BreadcrumbCommon/BreadcrumbCommon";
const { Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const breadcrumbItem = ["Hệ thống", "Dashboard"];
function Homepage() {
  const handleChangeNaviga = (key) => {};
  return (
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      <BreadcrumbCommon item={breadcrumbItem} />
      <Layout
        className="site-layout-background"
        style={{
          padding: "24px 0",
        }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
            }}
            onClick={({ key }) => handleChangeNaviga(key)}
            items={items2}
          />
        </Sider>
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
