import { Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { fbManagementSiderItems, openKeys } from "../../..";
import BreadcrumbCommon from "../../../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../../../../Common/Sider/SiderCommon";
import TableComponent from "../../../../../Common/TableComponent/TableComponent";
import { getAllPage } from "../../../../../Service/FBManagement";
import { columns } from "../Model/Model";

//-----------------------------------Component Start---------------------------------------------
function PagesManagement() {
  //-------------State----------------
  const breadcrumbItem = ["Quản lý FB", "Quản lý trang"];

  //-------State end--------

  const { userFbInfor } = useSelector((state) => state.user);
  //Notify
  const [api, contextHolder] = notification.useNotification();
  const [searchOption, setSearchOption] = useState();
  const [selectedRows, setSelectedRows] = useState();
  const [pagesData, setPagesData] = useState([]);
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  //Onchange selectedRows
  const handleChooseRow = (rows) => {
    setSelectedRows(rows);
  };
  //fetch pages data
  const fetchPagesData = async () => {
    try {
      const access_token = userFbInfor.authResponse.accessToken;
      const res = await getAllPage(access_token);
      if (res && res.status === 200 && res.data) {
        setPagesData(res.data.data);
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  //process data table
  const dataProcess = useMemo(() => {
    if (pagesData && pagesData.length === 0) {
      return [];
    }
    return pagesData.map((item) => {
      return {
        key: item.id,
        name: item.name,
        id: item.id,
        access_token: item.access_token,
      };
    });
  }, [pagesData]);
  useEffect(() => {
    fetchPagesData();
  }, []);
  return (
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      {contextHolder}
      <BreadcrumbCommon item={breadcrumbItem} />
      <Layout className="site-layout-background">
        <SiderCommon
          item={fbManagementSiderItems}
          widthRequest="250"
          openKeys={openKeys}
          keyItem="/dash/facebook-management/pages"
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <h1> Danh sách các trang</h1>
          <div className="table-authorities-container">
            <TableComponent
              handleChooseRow={handleChooseRow}
              columns={columns}
              dataSource={dataProcess}
              total={pagesData.length}
              setSearchOption={setSearchOption}
              searchOption={searchOption}
              screenName="Pages"
            />
          </div>
        </Content>
      </Layout>
    </Content>
  );
}

export default PagesManagement;
