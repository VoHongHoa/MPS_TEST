import { Button, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { SettingOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import { openKeys, systemSiderItems } from "../../..";
import BreadcrumbCommon from "../../../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../../../../Common/Sider/SiderCommon";
import TableComponent from "../../../../../Common/TableComponent/TableComponent";
import { deleteRole, search } from "../../../../../Service/Authorities";
import AuthoritiesAdd from "../AuthoritiesAdd";
import AuthoritiesEdit from "../AuthoritiesEdit/AuthoritiesEdit";
import "./AuthoritiesPage.scss";
import SettingDrawer from "../../../../../Common/SettingDrawer/SettingDrawer";
import { columns } from "../Model/Model";
import AuthoritiesSearch from "../AuthoritiesSearch/AuthoritiesSearch";
import EditPermission from "../AuthoritiesEdit/EditPermission";
//-----------------------------------Component Start---------------------------------------------
const AuthoritiesPage = () => {
  //-------------State----------------
  const breadcrumbItem = ["Hệ thống", "Phân quyền"];
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState({
    isOpenDrawerSetting: false,
    isOpenDrawerPermission: false,
  });
  const [searchModel, setSearchModel] = useState({
    roleName: "",
    roleCode: [],
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
  //Onchange SearchModel
  const handleChangeSearchModel = (value) => {
    setSearchModel(value);
  };
  //Onchange selectedRows
  const handleChooseRow = (rows) => {
    setSelectedRows(rows);
  };
  //Cancel Modal
  const handleCancel = () => {
    setIsOpenModalAdd(false);
  };
  const handleCancelEdit = () => {
    setIsOpenModalEdit(false);
  };
  //Delete Data
  const handleDeleteData = async () => {
    try {
      if (selectedRows.length === 0) {
        openNotification("warning", "topRight", "Vui lòng chọn dữ liệu để xóa");
        return;
      }
      const roles = selectedRows.map((item) => {
        return item.roleCode;
      });
      const res = await deleteRole({ roles });
      if (res && res.status === 200 && res.data.success === true) {
        openNotification("success", "topRight", res.data.message);
        setSelectedRows([]);
        handleSearch();
      } else {
        openNotification("error", "topRight", "Xóa dữ liệu không thành công");
      }
    } catch (e) {
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  const handleShowForm = () => {
    setAction("ADD");
    setIsOpenModalAdd(true);
  };
  // Seacch Click
  const handleSearch = async () => {
    console.log(searchOption);
    const res = await search({
      searchOption,
      searchModel,
    });
    if (res && res.status === 200) {
      setRolesData(res.data.roles);
      setTotalDocs(res.data.totalDocs);
    } else {
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  const handleShowFormCopy = () => {
    setAction("COPY");
    if (selectedRows.length !== 1) {
      openNotification(
        "warning",
        "topRight",
        "Vui lòng chọn 1 dòng dữ liệu để sao chép!"
      );
      return;
    }
    setIsOpenModalAdd(true);
  };
  const handleShowFormEdit = async () => {
    if (selectedRows.length !== 1) {
      openNotification(
        "warning",
        "topRight",
        "Vui lòng chọn 1 dòng dữ liệu để chỉnh sửa!"
      );
      return;
    }
    setIsOpenModalEdit(true);
  };
  const dataProcess = useMemo(() => {
    if (rolesData.length === 0) {
      return [];
    }
    return rolesData.map((item, index) => {
      return {
        key: item._id,
        roleName: item.roleName,
        roleCode: item.roleCode,
      };
    });
  }, [rolesData]);
  const handleOpenDrawer = () => {
    setIsOpenDrawer({
      ...isOpenDrawer,
      isOpenDrawerSetting: true,
    });
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer({
      ...isOpenDrawer,
      isOpenDrawerSetting: false,
    });
  };

  const handleOpenDrawerPermission = async () => {
    if (selectedRows.length !== 1) {
      openNotification(
        "warning",
        "topRight",
        "Chọn 1 dòng dữ liệu để phân quyền!"
      );
      return;
    }
    setIsOpenDrawer({
      ...isOpenDrawer,
      isOpenDrawerPermission: true,
    });
  };

  const handleCloseDrawerPermission = () => {
    setIsOpenDrawer({
      ...isOpenDrawer,
      isOpenDrawerPermission: false,
    });
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
          keyItem="/dash/he-thong/phan-quyen"
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <div className="search-authorities-container">
            <AuthoritiesSearch
              onChange={handleChangeSearchModel}
              seachModel={searchModel}
              screenName="Authorities"
            />
          </div>
          <div className="btn-authorities-container">
            <div className="btn-container">
              <Button type="primary" size={"large"} onClick={handleSearch}>
                Tìm kiếm
              </Button>
              <AuthoritiesAdd
                isOpenModal={isOpenModalAdd}
                handleCancel={handleCancel}
                fetchRoleData={handleSearch}
                selectedRow={selectedRows}
                setSelectedRows={setSelectedRows}
                action={action}
              />
              <Button type="primary" onClick={handleShowForm} size={"large"}>
                Thêm mới
              </Button>
              <Button
                type="primary"
                onClick={handleShowFormCopy}
                size={"large"}
              >
                Sao chép
              </Button>
              <Button
                type="primary"
                onClick={handleShowFormEdit}
                size={"large"}
              >
                Chỉnh sửa
              </Button>
              <AuthoritiesEdit
                isOpenModalEdit={isOpenModalEdit}
                handleCancelEdit={handleCancelEdit}
                fetchRoleData={handleSearch}
                selectedRow={selectedRows}
                setSelectedRows={setSelectedRows}
              />
              <Button
                type="primary"
                size={"large"}
                onClick={handleOpenDrawerPermission}
              >
                Phân quyền
              </Button>
              {selectedRows.length === 1 && (
                <EditPermission
                  isOpenDrawerPermission={isOpenDrawer.isOpenDrawerPermission}
                  handleCloseDrawerPermission={handleCloseDrawerPermission}
                  value={selectedRows}
                />
              )}

              <Button type="primary" onClick={handleDeleteData} size={"large"}>
                Xóa
              </Button>
            </div>
            <div className="setting-container">
              <SettingOutlined onClick={handleOpenDrawer} />
              <SettingDrawer
                isOpenDrawer={isOpenDrawer.isOpenDrawerSetting}
                handleCloseDrawer={handleCloseDrawer}
                screenName="Authorities"
                options={columns}
              />
            </div>
          </div>
          <div className="table-authorities-container">
            <TableComponent
              handleChooseRow={handleChooseRow}
              columns={columns}
              dataSource={dataProcess}
              total={totalDocs}
              setSearchOption={setSearchOption}
              handleSearch={handleSearch}
              seachModel={searchModel}
              searchOption={searchOption}
              screenName="Authorities"
            />
          </div>
        </Content>
      </Layout>
    </Content>
  );
};

export default AuthoritiesPage;
