import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { openKeys, productSiderItems } from "..";
import BreadcrumbCommon from "../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../../Common/Sider/SiderCommon";

const GroupProductsPage = () => {
  const breadcrumbItem = ["Sản phẩm", "Nhóm sản phẩm"];
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
          keyItem="/dash/san-pham/groups-product"
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          Group product Management
        </Content>
      </Layout>
    </Content>
  );
};

export default GroupProductsPage;
