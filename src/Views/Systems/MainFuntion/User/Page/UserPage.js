import { Button, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { SettingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { openKeys, systemSiderItems } from "../../..";
import BreadcrumbCommon from "../../../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../../../../Common/Sider/SiderCommon";
import SettingDrawer from "../../../../../Common/SettingDrawer/SettingDrawer";
import { columns } from "../Model/Model";
import UserSearch from "../Search/UserSearch";
import TableComponent from "../../../../../Common/TableComponent/TableComponent";

//-----------------------------------Component Start---------------------------------------------
const UserPage = () => {
  //-------------State----------------
  const breadcrumbItem = ["Hệ thống", "Người dùng"];
  const [isOpenModal, setIsOpenModal] = useState({
    add: false,
    edit: false,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchModel, setSearchModel] = useState({
    userName: "",
    userCode: "",
    address: "",
    telephone: "",
    gender: "",
    role: "",
  });
  const [action, setAction] = useState("");
  const [searchOption, setSearchOption] = useState({
    page: 1,
    limit: 10,
  });
  const [totalDocs, setTotalDocs] = useState(0);
  //-------State end--------
  //Notify
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  const handleChooseRow = (rows) => {
    setSelectedRows(rows);
  };
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
          item={systemSiderItems}
          widthRequest="250"
          openKeys={openKeys}
          keyItem="/dash/he-thong/nguoi-dung"
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <div className="search-authorities-container">
            <UserSearch screenName="User" />
          </div>
          <div className="btn-authorities-container">
            <div className="btn-container">
              <Button type="primary" size={"large"}>
                Tìm kiếm
              </Button>

              <Button type="primary" size={"large"}>
                Thêm mới
              </Button>
              <Button type="primary" size={"large"}>
                Sao chép
              </Button>
              <Button type="primary" size={"large"}>
                Chỉnh sửa
              </Button>

              <Button type="primary" size={"large"}>
                Phân quyền
              </Button>

              <Button type="primary" size={"large"}>
                Xóa
              </Button>
            </div>
            <div className="setting-container">
              <SettingOutlined onClick={handleOpenDrawer} />
              <SettingDrawer
                isOpenDrawer={isOpenDrawer}
                handleCloseDrawer={handleCloseDrawer}
                options={columns}
                screenName="User"
              />
            </div>
          </div>
          <div className="table-authorities-container">
            <TableComponent
              handleChooseRow={handleChooseRow}
              columns={columns}
              dataSource={[]}
              total={totalDocs}
              setSearchOption={setSearchOption}
              seachModel={searchModel}
              searchOption={searchOption}
              screenName="User"
            />
          </div>
        </Content>
      </Layout>
    </Content>
  );
};

export default UserPage;
