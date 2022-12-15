import React from "react";
import { Collapse, Input, Layout } from "antd";
import SiderCommon from "../../../Common/Sider/SiderCommon";
import { openKeys, productSiderItems } from "..";
import BreadcrumbCommon from "../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import "./UnitPage.scss";
const { Content } = Layout;
const UnitsPage = () => {
  const breadcrumbItem = ["Sản phẩm", "Đơn vị tính"];
  const { Panel } = Collapse;
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
          <div className="search-container">
            <Collapse
              collapsible="header"
              defaultActiveKey={["1"]}
              expandIconPosition="end"
            >
              <Panel header="Thông tin tìm kiếm" key="1">
                <Input />
                <Input />
                <Input />
                <Input />
                <Input />
              </Panel>
            </Collapse>
          </div>
          <div className="table-container"></div>
        </Content>
      </Layout>
    </Content>
  );
};

export default UnitsPage;
