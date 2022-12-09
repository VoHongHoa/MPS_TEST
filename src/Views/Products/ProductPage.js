import { Layout } from "antd";
import SiderCommon from "../../Common/Sider/SiderCommon";
import BreadcrumbCommon from "../../Common/BreadcrumbCommon/BreadcrumbCommon";
import { openKeys, productSiderItems } from ".";
const { Content } = Layout;

const breadcrumbItem = ["Sản phẩm", "Dashboard"];
function ProductPage() {
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
          openKeys={openKeys}
          widthRequest="250"
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          Proguct Dashboard
        </Content>
      </Layout>
    </Content>
  );
}

export default ProductPage;
