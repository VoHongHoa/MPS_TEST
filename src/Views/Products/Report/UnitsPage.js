import React from "react";
import { Layout } from "antd";
import SiderCommon from "../../../Common/Sider/SiderCommon";
import { openKeys, productSiderItems } from "..";
import BreadcrumbCommon from "../../../Common/BreadcrumbCommon/BreadcrumbCommon";
const { Content } = Layout;
const UnitsPage = () => {
  const breadcrumbItem = ["Sản phẩm", "Đơn vị tính"];
  return (
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      <BreadcrumbCommon item={breadcrumbItem} />
      <Layout className="site-layout-background">
        <SiderCommon
          item={productSiderItems}
          widthRequest="250"
          openKeys={openKeys}
          keyItem="/dash/san-pham/unit"
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          Unit Management
        </Content>
      </Layout>
    </Content>
  );
};

export default UnitsPage;
