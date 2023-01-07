import { Button, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { SettingOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import { openKeys, systemSiderItems } from "../../..";
import BreadcrumbCommon from "../../../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../../../../Common/Sider/SiderCommon";
import SettingDrawer from "../../../../../Common/SettingDrawer/SettingDrawer";
import { columns } from "../Model/Model";
import UserSearch from "../Search/UserSearch";
import TableComponent from "../../../../../Common/TableComponent/TableComponent";
import UserAdd from "../Add/UserAdd";
import { deleteUsers, searchUsers } from "../../../../../Service/User";
import moment from "moment";

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
  const [searchModel, setSearchModel] = useState({});
  const [action, setAction] = useState("");
  const [searchOption, setSearchOption] = useState({
    page: 1,
    limit: 10,
  });
  const [totalDocs, setTotalDocs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleOpenModal = () => {
    const copyState = isOpenModal;
    copyState.add = true;
    setIsOpenModal(copyState);
    setAction("ADD");
  };

  const handleCancel = () => {
    const copyState = isOpenModal;
    copyState.add = false;
    setIsOpenModal(copyState);
    setAction("");
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

  const handleDeleteUser = async () => {
    const dataDelete = selectedRows.map((item) => {
      return item.key;
    });
    const data = {
      dataDelete: dataDelete,
    };
    try {
      const res = await deleteUsers(data);
      if (res && res.status === 200 && res.data.success === true) {
        openNotification("success", "topRight", res.data.message);
        handleSearch();
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const dataSearch = {
      searchModel,
      searchOption,
    };
    const res = await searchUsers(dataSearch);
    if (res && res.status === 200 && res.data.success === true) {
      console.log(res);
      setUserData(res.data.users);
      setTotalDocs(res.data.total);
      setIsLoading(false);
    }
  };
  const processUserData = useMemo(() => {
    if (userData.length === 0) {
      return [];
    }
    return userData.map((item) => {
      return {
        key: item._id,
        userName: item.userName,
        displayName: item.displayName,
        userCode: item.userCode,
        address: item.address,
        telephone: item.telephone,
        gender: item.gender,
        roleCode: item.role,
        createdAt: moment(item.createdAt).format("L"),
        updatedAt: moment(item.updatedAt).format("L"),
        createdBy: item.createdBy,
        updatedBy: item.updatedBy,
      };
    });
  }, [userData]);

  const handleCoppyUser = () => {
    const copyState = isOpenModal;
    copyState.add = true;
    setIsOpenModal(copyState);
    setAction("COPPY");
  };
  const handleOnchangeSearchModel = (value) => {
    setSearchModel(value);
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
            <UserSearch
              screenName="User"
              onChange={handleOnchangeSearchModel}
            />
          </div>
          <div className="btn-authorities-container">
            <div className="btn-container">
              <Button
                type="primary"
                size={"large"}
                onClick={handleSearch}
                loading={isLoading}
              >
                Tìm kiếm
              </Button>

              <Button type="primary" size={"large"} onClick={handleOpenModal}>
                Thêm mới
              </Button>
              <UserAdd
                isOpenModal={isOpenModal.add}
                handleCancel={handleCancel}
                action={action}
                fetchUserData={handleSearch}
              />
              <Button type="primary" size={"large"} onClick={handleCoppyUser}>
                Sao chép
              </Button>
              <Button type="primary" size={"large"}>
                Chỉnh sửa
              </Button>
              <Button type="primary" size={"large"} onClick={handleDeleteUser}>
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
              dataSource={processUserData}
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
