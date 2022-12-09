import React from "react";
import { Layout } from "antd";
import SiderCommon from "../../../Common/Sider/SiderCommon";
import { openKeys, productSiderItems } from "..";
import BreadcrumbCommon from "../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import "./CategoriesPage.scss";
const { Content } = Layout;
const CategoriesPage = () => {
  const breadcrumbItem = ["Sản phẩm", "Loại sản phẩm"];
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
          keyItem="/dash/san-pham/categories"
        />

        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          Categories Management
        </Content>
      </Layout>
    </Content>
  );
};

export default CategoriesPage;
